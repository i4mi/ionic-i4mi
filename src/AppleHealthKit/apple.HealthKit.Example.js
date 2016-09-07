/*

This is a tutorial how to implement Apple HealthKit into your app

*/



// Add following line in your index.html file

<script src='lib/ngCordova/dist/ng-cordova.js'></script>


// Open the terminal, navigate to your project folder and run the following command

cordova plugin add https://github.com/Telerik-Verified-Plugins/HealthKit


// Open the terminal and run following commands
ionic add platform ios
ionic build ios

// Open in platform the IOS project with Xcode and do following steps
1. go on the tab "capabilities"
2. switch the HealthKit to on



// Here is a little Example with height
// Add following lines in your template file
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


// go in app.js add in ionicplaform.ready() following lines
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


// Now you can add the following line to your controller
.controller('AppCtrl', function($scope, $cordovaHealthKit) {
  var healthKit = new HealthKit($scope, $cordovaHealthKit);
  // Save height
  healthKit.saveHeight();

  // Get Height
  healthKit.getHeight();

  // Save Workout
  healthKit.saveWorkout();

  // Get Workouts
  healthKit.getWorkouts();

}
