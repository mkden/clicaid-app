// scripts/fix-android-permissions.js

const fs = require('fs');
const path = require('path');

function patchPluginXml(pluginName) {
  const pluginXmlPath = path.join(
    __dirname,
    '..',
    'node_modules',
    pluginName,
    'plugin.xml'
  );

  if (!fs.existsSync(pluginXmlPath)) {
    console.log(`[fix-perms] ${pluginName}: plugin.xml not found, skip`);
    return;
  }

  let xml = fs.readFileSync(pluginXmlPath, 'utf8');

  // Удаляем лишнее WRITE_EXTERNAL_STORAGE из Android-платформы
  const before = xml;
  xml = xml.replace(
    /<uses-permission[^>]*android:name="android\.permission\.WRITE_EXTERNAL_STORAGE"[^>]*\/>\s*/g,
    ''
  );

  if (xml !== before) {
    fs.writeFileSync(pluginXmlPath, xml, 'utf8');
    console.log(`[fix-perms] ${pluginName}: removed WRITE_EXTERNAL_STORAGE`);
  } else {
    console.log(
      `[fix-perms] ${pluginName}: WRITE_EXTERNAL_STORAGE not found, nothing to do`
    );
  }
}

function main() {
  // Патчим те плагины, которые потенциально добавляют дубли
  patchPluginXml('cordova-plugin-camera');
  patchPluginXml('cordova-plugin-crop');
  patchPluginXml('onesignal-cordova-plugin');
}

main();
