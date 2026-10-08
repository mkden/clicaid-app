'use strict';

// Appflow calls Xcode directly after "cordova platform add ios".
// Restrict the generated Cordova 8 application target to actual iOS destinations,
// rather than allowing Catalyst / visionOS to be inferred by newer Xcode versions.
const fs = require('node:fs');
const path = require('node:path');

module.exports = function restrictCordovaIOSPlatforms(context) {
    const projectRoot = context && context.opts && context.opts.projectRoot;
    if (!projectRoot) throw new Error('[iOS platform hook] Cordova project root unavailable');

    const projectFile = path.join(projectRoot, 'platforms', 'ios', 'App.xcodeproj', 'project.pbxproj');
    if (!fs.existsSync(projectFile)) {
        if (context.opts.cordova && context.opts.cordova.platforms &&
            !context.opts.cordova.platforms.includes('ios')) return;
        throw new Error('[iOS platform hook] Generated App.xcodeproj missing: ' + projectFile);
    }

    const original = fs.readFileSync(projectFile, 'utf8');
    const sdkEntries = (original.match(/^[ \t]*SDKROOT = iphoneos;$/gm) || []).length;
    if (sdkEntries < 2) {
        throw new Error('[iOS platform hook] Unexpected Xcode project format (iPhoneOS SDKROOT count=' + sdkEntries + ')');
    }

    let updated = original.replace(/SUPPORTS_MACCATALYST = YES;/g, 'SUPPORTS_MACCATALYST = NO;');
    updated = updated.replace(/^([ \t]*)SDKROOT = iphoneos;$/gm, function (matched, indent, offset, full) {
        const previousLines = full.slice(0, offset).split(/\r?\n/);
        const lineBefore = previousLines[previousLines.length - 2] || '';
        // Project may be prepared twice (after_prepare + after_platform_add).
        if (/SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";/.test(lineBefore)) return matched;
        return indent + 'SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";\n' + matched;
    });

    // Make sure the generated App scheme cannot select a non-iOS destination.
    const iphoneOnly = (updated.match(/SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";/g) || []).length;
    if (iphoneOnly < 2) throw new Error('[iOS platform hook] Could not enforce iphoneos/iphonesimulator on project');
    if (updated !== original) fs.writeFileSync(projectFile, updated, 'utf8');
    console.log('[iOS platform hook] iPhone/iPad only, Mac Catalyst disabled (Xcode/Appflow).');
};
