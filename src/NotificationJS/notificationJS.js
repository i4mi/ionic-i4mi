

var cordovaLocalNotification;

var NotificationJS = function($ionicPlatform, $cordovaLocalNotification, $window) {
  $ionicPlatform.ready(function() {
    if (ionic.Platform.isIOS()) {
      $window.plugin.notification.local.promptForPermission();
    }
  });
cordovaLocalNotification = $cordovaLocalNotification;


$ionicPlatform.ready(function() {
      if ($window.cordova &&
          $window.cordova.plugins &&
          $window.cordova.plugins.barcodeScanner) {
        console.log('Plugin available');
      }
});

};

NotificationJS.prototype.add = function() {

  var alarmTime = new Date();
  alarmTime.setMinutes(alarmTime.getMinutes() + 1);

  console.info(cordovaLocalNotification);

  cordovaLocalNotification.add({
    id: $config['id'],
    date: alarmTime,
    message: $config['message'],
    title: $config['title'],
    autoCancel: true,
    sound: null
  });
}

NotificationJS.prototype.isScheduled = function() {
  cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
    alert("Notification 1234 Scheduled: " + isScheduled);
  });
}
