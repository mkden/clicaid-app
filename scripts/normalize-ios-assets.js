'use strict';

// The obsolete cordova-plugin-crop@0.4 ships .png/.strings resource files
// marked executable. Apple's upload validation may attempt lipo on executables
// inside bundles; only real Mach-O files should keep executable permissions.
// Normalize both npm sources and generated Cordova project assets *before signing*.
const fs = require('node:fs');
const path = require('node:path');

function normalizeCropBundle(bundle) {
    if (!fs.existsSync(bundle) || !fs.statSync(bundle).isDirectory()) return 0;
    let updated = 0;
    function visit(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                visit(fullPath);
            } else if (entry.isFile() && /\.(png|strings)$/i.test(entry.name)) {
                const mode = fs.statSync(fullPath).mode;
                if ((mode & 0o111) !== 0) {
                    fs.chmodSync(fullPath, mode & ~0o111);
                    updated++;
                    console.log('[ios-assets] Removed executable bit from ' + path.relative(process.cwd(), fullPath));
                }
            }
        }
    }
    visit(bundle);
    return updated;
}

module.exports = function normalizeIosAssets(root = path.resolve(__dirname, '..')) {
    const candidateRoots = [
        path.join(root, 'node_modules', 'cordova-plugin-crop'),
        path.join(root, 'plugins', 'cordova-plugin-crop'),
        path.join(root, 'platforms', 'ios'),
    ];
    let bundlesFound = 0;
    let updated = 0;
    function search(dir) {
        if (!fs.existsSync(dir)) return;
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);
            if (!entry.isDirectory()) continue;
            if (entry.name === 'PEPhotoCropEditor.bundle') {
                bundlesFound++;
                updated += normalizeCropBundle(fullPath);
            } else {
                search(fullPath);
            }
        }
    }
    for (const dir of candidateRoots) search(dir);
    console.log('[ios-assets] Checked ' + bundlesFound + ' crop resource bundles; corrected ' + updated + ' files.');
    return { bundlesFound, updated };
};

if (require.main === module) module.exports();
