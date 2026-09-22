(function () {
    'use strict';

    var APP_ID = '8c912104-8b46-497f-9ea2-d0cd76def931';
    var started = false;
    var retries = 0;

    document.addEventListener('deviceready', initOneSignal, false);

    function getOneSignal() {
        if (window.OneSignal) return window.OneSignal;
        if (window.plugins && window.plugins.OneSignal) return window.plugins.OneSignal;
        return null;
    }

    function initOneSignal() {
        if (started) return;

        var oneSignal = getOneSignal();
        if (!oneSignal || typeof oneSignal.initialize !== 'function') {
            if (retries++ < 10) setTimeout(initOneSignal, 500);
            return;
        }

        started = true;

        try {
            oneSignal.initialize(APP_ID);

            if (oneSignal.Notifications &&
                typeof oneSignal.Notifications.addEventListener === 'function') {
                oneSignal.Notifications.addEventListener('click', function (event) {
                    console.log('OneSignal notification clicked:', event);
                });
            }

            if (oneSignal.Notifications &&
                typeof oneSignal.Notifications.canRequestPermission === 'function') {
                oneSignal.Notifications.canRequestPermission().then(function (canRequest) {
                    if (canRequest &&
                        typeof oneSignal.Notifications.requestPermission === 'function') {
                        return oneSignal.Notifications.requestPermission(false);
                    }
                    return false;
                }).then(function (accepted) {
                    console.log('OneSignal notification permission:', accepted);
                }).catch(function (error) {
                    console.error('OneSignal permission error:', error);
                });
            } else if (oneSignal.Notifications &&
                       typeof oneSignal.Notifications.requestPermission === 'function') {
                oneSignal.Notifications.requestPermission(false).catch(function (error) {
                    console.error('OneSignal permission error:', error);
                });
            }
        } catch (error) {
            started = false;
            console.error('OneSignal initialization error:', error);
        }
    }
})();
