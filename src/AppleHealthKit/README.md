# Implement Module Apple HealthKit
This module has the most important functions to work with MIDATA.

## Enable HealthKit

1. Add the script reference to your *index.html*


```sh

<script src='lib/ngCordova/dist/ng-cordova.js'></script>

```


2. Open the terminal, navigate to your project folder and run the following command

```sh

$ cordova plugin add https://github.com/Telerik-Verified-Plugins/HealthKit

```



3. Open the terminal and build a xCode-Project

```sh

$ ionic add platform ios
$ ionic build ios

```


3. Navigate in your project folder to platform/ios and open with xCode the project
  a. go on the tab "capabilities"
  b. switch the HealthKit to on

## Example

1. Add the heigth to your template file (e.g  tabs-example.html)

```sh
<!-- Height -->
      <div class="list">
        <div class="item item-input-inset">
          <label class="item-input-wrapper">
            <input type="text" placeholder="Your height" ng-model="body.height">
          </label>
          <button class="button button-small" ng-click="saveHeight()">Set height</button>
        </div>
      </div>

      <button class="button button-positive" ng-click="getHeight()">Get height</button>
      <br>
      <!-- Workout -->
      <button class="button button-positive" ng-click="saveWorkout()">Set a Workout</button>
      <button class="button button-positive" ng-click="getWorkouts()">Get workout data</button>
<!-- / Height -->
```

2. Go into your *app.js* and in *ionicplatform.ready()* following lines

```sh
cordovaHealthKit.isAvailable().then(function(yes) {
    // HK is available
    var permissions = ['HKQuantityTypeIdentifierHeight'];

    $cordovaHealthKit.requestAuthorization(
        permissions, // Read permission
        permissions // Write permission
    ).then(function(success) {
        // store that you have permissions
    }, function(err) {
        // handle error
    });

}, function(no) {
    // No HK available
});
```

3. Add the following logic to your controller

```sh
.controller('ExampleCtrl', function($scope, $cordovaHealthKit) {
  var healthKit = new HealthKit($scope, $cordovaHealthKit);
  // Save height
  healthKit.saveHeight();

  // Get Height
  healthKit.getHeight();

  // Save Workout
  healthKit.saveWorkout();

  // Get Workouts
  healthKit.getWorkouts();
  ...
}
```
