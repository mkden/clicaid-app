// Initialize OneSignal after Cordova is ready.
document.addEventListener('deviceready', OneSignalInit, false);

function OneSignalInit() {
    var oneSignal = window.plugins && window.plugins.OneSignal;
    if (!oneSignal) {
        console.error('OneSignal plugin is not available');
        return;
    }

    oneSignal.initialize('8c912104-8b46-497f-9ea2-d0cd76def931');

    oneSignal.Notifications.addEventListener('click', function(event) {
        console.log('notificationClicked: ' + JSON.stringify(event));
    });

    oneSignal.Notifications.requestPermission(true)
        .then(function(accepted) {
            console.log('User accepted notifications: ' + accepted);
        })
        .catch(function(error) {
            console.error('OneSignal permission error:', error);
        });
}
