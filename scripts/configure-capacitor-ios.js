'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const dir=path.join(root,'ios','App'),proj=path.join(dir,'App.xcodeproj','project.pbxproj');
if(!fs.existsSync(proj))throw Error('[cap-ios] Native iOS missing; run npx cap add ios first');
const plist=path.join(dir,'App','Info.plist');
let info=fs.readFileSync(plist,'utf8');
const permissions={
 NSCameraUsageDescription:'Камера необходима для фото профиля и заявок.',
 NSPhotoLibraryUsageDescription:'Доступ к фотографиям необходим для выбора изображений.',
 NSPhotoLibraryAddUsageDescription:'Доступ необходим для сохранения изображений.',
 NSLocationWhenInUseUsageDescription:'Геолокация используется для поиска ближайших объектов.'
};
for(const key of Object.keys(permissions)){
 if(!info.includes('<key>'+key+'</key>')){
  info=info.replace('</dict>','<key>'+key+'</key>\n<string>'+permissions[key]+'</string>\n</dict>');
 }
}
if(!info.includes('<key>UIBackgroundModes</key>')){
 info=info.replace('</dict>','<key>UIBackgroundModes</key>\n<array><string>remote-notification</string></array>\n</dict>');
}
fs.writeFileSync(plist,info);
let p=fs.readFileSync(proj,'utf8');
p=p.replace(/IPHONEOS_DEPLOYMENT_TARGET = [^;]+;/g,'IPHONEOS_DEPLOYMENT_TARGET = 15.0;');
p=p.replace(/MARKETING_VERSION = [^;]+;/g,'MARKETING_VERSION = 1.9.12;');
p=p.replace(/CURRENT_PROJECT_VERSION = [^;]+;/g,'CURRENT_PROJECT_VERSION = 10912;');
const marker='CODE_SIGN_ENTITLEMENTS = App/App.entitlements;';
if(!p.includes(marker)){
 p=p.replace(/(\t+)(PRODUCT_BUNDLE_IDENTIFIER = mk\.clicaid\.app;)/g,
  (match,indent,setting)=>indent+marker+'\n'+indent+setting);
}
if(!p.includes(marker))throw Error('[cap-ios] Could not set APNs entitlements for App target');
fs.writeFileSync(proj,p);
fs.writeFileSync(path.join(dir,'App','App.entitlements'),
 '<?xml version="1.0" encoding="UTF-8"?>\n'+
 '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n'+
 '<plist version="1.0"><dict><key>aps-environment</key><string>production</string></dict></plist>\n');
const icon=path.join(root,'icon-1024.png');
const iconset=path.join(dir,'App','Assets.xcassets','AppIcon.appiconset');
if(fs.existsSync(icon)&&fs.existsSync(iconset)){
 const names=fs.readdirSync(iconset).filter(n=>n.toLowerCase().endsWith('.png'));
 for(const n of names)fs.copyFileSync(icon,path.join(iconset,n));
}
console.log('[cap-ios] Camera/photo/location and production APNs configured; version 1.9.12');
