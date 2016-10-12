# NotificationJS
Small tutorial to implement Push-Notification in an ionic project.

## Prerequisites
- Ionic account (don't have one create one or use the i4mi ionic-account)
- A physical Android or iOS device to tests
- A Google and Apple security profile (Follow this two instructions iOS Push Certificate (https://docs.ionic.io/services/profiles/#ios-push-certificate) & GCM Api Key  )
- Cloud Client installed and configure


### Implement NotificationJS
#### Install and configure Cloud Client
 1. Open terminal and navigate to ionic project root folder

 2. To install the cloud module execute following command
 ```sh

      npm install @ionic/cloud-angular --save

```

 3. Before we can configure the cloud client, we have to create an app ID and a app key. Run following in your project folder

```ssh

    $ ionic io init

```

 4. With the following command the push-plugin from phonegap can be install easily

```sh

    $ sudo cordova plugin add phonegap-plugin-push --variable SENDER_ID=12341234 --save

```

5. Add following lines in your app.js file and replace APP_ID with app_id and SENDER_ID with GCP project number.

```sh

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID',
  },
  'push': {
    'sender_id': 'SENDER_ID',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};


```

#### local-notification

1. Add the cordova-local-notification-plugin in your project with following command

```sh

    $ sudo cordova plugin add de.appplant.cordova.plugin.local-notification

```

2. Add following line in index.html file to implement script in your app

```sh

<script src="lib/ngCordova/dist/ng-cordova.min.js"></script>

```

3. Add module ngCordova to your app.js

```sh

angular.module("ionic", ["ionic", "ngCordova"]);

```

4. Add in your Controller this basic function construct
```sh

// Check if is mobile
if (window.cordova) {
  console.log('window.cordova is available');

// Create a new NotificationJS-Object
  var notificationJS = new NotificationJS($ionicPlatform, $cordovaLocalNotification);
  var config = {
    id: "1234",
    title: "DemoApp",
    message: "Testing"
  };

  // Add new NotificationJS
  notificationJS.add(config);
  notificationJS.isScheduled();
} else {
  // Create a console log if is not on a mobile device
  console.log('window.cordova NOT available');
}

```
