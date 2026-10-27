'use strict';

// The App Store requires all four iPad orientations when multitasking is
// supported. Cordova 8 generates Xcode build settings as well as Info.plist.
// Patch both before Appflow signs the archive, while keeping iPhone portrait.
const fs = require('node:fs');
const path = require('node:path');

const ipad = [
  'UIInterfaceOrientationPortrait',
  'UIInterfaceOrientationPortraitUpsideDown',
  'UIInterfaceOrientationLandscapeLeft',
  'UIInterfaceOrientationLandscapeRight'
];
const iphone = ['UIInterfaceOrientationPortrait'];

function replaceArray(xml, key, values) {
  const lines = '<array>\n' + values.map(v => '        <string>' + v + '</string>').join('\n') + '\n    </array>';
  const pattern = new RegExp('(<key>' + key + '<\\/key>\\s*)<array>[\\s\\S]*?<\\/array>');
  if (pattern.test(xml)) return xml.replace(pattern, '$1' + lines);
  const close = xml.lastIndexOf('</dict>');
  if (close === -1) throw Error('[ios-orientations] Invalid plist XML');
  return xml.slice(0,close) + '    <key>' + key + '</key>\n    ' + lines + '\n' + xml.slice(close);
}

module.exports = function ensureIOSOrientations(root) {
  const ios = path.join(root,'platforms','ios');
  const pbx = path.join(ios,'App.xcodeproj','project.pbxproj');
  let source = fs.readFileSync(pbx,'utf8');
  for (const [key, values] of [
    ['INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad',ipad],
    ['INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone',iphone]
  ]) {
    const pattern = new RegExp('(^[ \\t]*' + key + ' = )[^;]*;','gm');
    const count = [...source.matchAll(pattern)].length;
    if (count < 2) throw Error('[ios-orientations] Missing expected Xcode setting: ' + key);
    source = source.replace(pattern, '$1"' + values.join(' ') + '";');
  }
  fs.writeFileSync(pbx,source);
  let plists=0;
  for (const name of ['App-Info.plist','Info.plist']) {
    const filename=path.join(ios,'App',name);
    if (!fs.existsSync(filename)) continue;
    const original=fs.readFileSync(filename,'utf8');
    if (!original.includes('<plist')) continue;
    let xml=replaceArray(original,'UISupportedInterfaceOrientations',ipad);
    xml=replaceArray(xml,'UISupportedInterfaceOrientations~ipad',ipad);
    xml=replaceArray(xml,'UISupportedInterfaceOrientations~iphone',iphone);
    if (xml!==original){fs.writeFileSync(filename,xml);plists++;}
  }
  console.log('[ios-orientations] iPad all 4, iPhone portrait. Updated '+plists+' plist(s) and Xcode build settings.');
};
