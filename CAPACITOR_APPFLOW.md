# iOS TestFlight via Ionic Appflow — Capacitor

This is the **Capacitor** branch of the real Clicaid Prozakon app, not the Cordova application in main.

- GitHub branch: `capacitor-ios-testflight`
- Native iOS project: `ios/App/App.xcworkspace` (committed)
- Runtime: Capacitor 8, WebView content from the real root `www/` screens
- Bundle ID: `mk.clicaid.app`
- Version: `1.9.12` / build `10912`
- Apple Team ID: `F2BCHMBHU9`
- Entry: `npm run build`, then `npx cap sync ios`

## Appflow

The existing Appflow application named **clicaid** is marked **Cordova**. It must
not be used to compile this branch as Cordova.

1. In Appflow use **Apps → Import App → Capacitor**.
2. Link the *same* GitHub repository `mkden/clicaid-app`.
3. Select the latest commit of `capacitor-ios-testflight` (not `main`).
4. Configure the Apple Distribution `.p12` certificate and App Store
   provisioning profile matching the bundle ID `mk.clicaid.app`, Team
   `F2BCHMBHU9`, in **Signing Certificates**.
5. Build iOS → App Store → latest macOS Apple silicon stack (Xcode 26+).
6. Confirm the signed IPA contains `arm64`, that the app launches, and that
   camera/file transfer, geolocation, login and push notification features work.
7. Deliver via Appflow **Deploy → Apple App Store**, or submit the signed IPA via
   Transporter, and verify Apple accepted the build into TestFlight.

The GitHub Actions job is a **preflight**: it builds an **unsigned** arm64
Xcode archive and is **not** itself an App Store upload.

The separate legacy folder `clicaid/` is an Ionic starter template. The
actual Prozakon UI and data flows live under the root `www/` folder.

**Important**: Legacy Cordova plugins are bridged via Capacitor and must be
device-tested before distributing to testers. Signing certificates and private
keys must not be committed to GitHub.
