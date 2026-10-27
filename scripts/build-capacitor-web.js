'use strict';
const fs=require('node:fs'),path=require('node:path'),esbuild=require('esbuild');
const root=path.resolve(__dirname,'..');
const src=path.join(root,'www'),dst=path.join(root,'cap-web');
fs.rmSync(dst,{recursive:true,force:true});fs.cpSync(src,dst,{recursive:true});
let htmlUpdated=0;
function walk(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const p=path.join(dir,entry.name);
  if(entry.isDirectory()){walk(p);continue;}
  if(!entry.isFile()||!p.endsWith('.html'))continue;
  const before=fs.readFileSync(p,'utf8');
  let s=before.replace(/<script\b[^>]*\bsrc=["'](?:\.\/)?cordova\.js["'][^>]*>\s*<\/script>/gi,'');
  s=s.replace(/<script\b[^>]*\bsrc=["'](?:\.\/)?js\/index\.js["'][^>]*>\s*<\/script>/gi,
    '<script defer src="js/capacitor-push.js"></script>');
  // The original Cordova app refers to an uninstalled update plugin; do not
  // throw on Capacitor when the obsolete plugin is absent.
  s=s.replace(/\bAppUpdate\.needsUpdate\(/g,
    '(window.AppUpdate && window.AppUpdate.needsUpdate ? window.AppUpdate.needsUpdate : function(cb){if(cb)cb({needsUpdate:false});})(');
  // Use WKWebView's secure clipboard API instead of missing Cordova clipboard.
  s=s.replace(/cordova\.plugins\.clipboard\.copy\(([^()]+)\);/g,
    'if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText($1);');
  if(s!==before){htmlUpdated++;fs.writeFileSync(p,s,'utf8');}
 }
}
walk(dst);
const out=path.join(dst,'js','capacitor-push.js');
esbuild.buildSync({entryPoints:[path.join(root,'cap-src','onesignal.js')],outfile:out,
  bundle:true,platform:'browser',format:'iife',target:'es2020',minify:true,legalComments:'none'});
fs.rmSync(path.join(dst,'js','index.js'),{force:true});
if(!fs.existsSync(path.join(dst,'index.html')))throw Error('Missing web entry');
console.log('[capacitor] Staged '+htmlUpdated+' updated pages; bundled OneSignal '+fs.statSync(out).size+' bytes');
