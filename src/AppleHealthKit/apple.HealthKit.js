

var HealthKit = function(scope, cordovaHealthKit)
{
scope.body = {
       height: ''
   };
}

HealthKit.prototype.saveHeight = function() {
$scope.saveHeight = function() {
        $cordovaHealthKit.saveHeight($scope.body.height, 'cm').then(function(v) {
        }, function(err) {
            console.log(err);
        });
    };
};

HealthKit.prototype.getHeight = function() {
$scope.getHeight = function() {
        $cordovaHealthKit.readHeight('cm').then(function(v) {
            alert('Your height: ' + v.value + " " + v.unit);
        }, function(err) {
            console.log(err);
        });
    };
}


HealthKit.prototype.saveWorkout = function() {
$scope.saveWorkout = function() {
        $cordovaHealthKit.saveWorkout(
            {
                'activityType': 'HKWorkoutActivityTypeCycling',
                'quantityType': 'HKQuantityTypeIdentifierDistanceCycling',
                'startDate': new Date(), // now
                'endDate': null, // not needed when using duration
                'duration': 6000, //in seconds
                'energy': 400, //
                'energyUnit': 'kcal', // J|cal|kcal
                'distance': 5, // optional
                'distanceUnit': 'km'
            }
        ).then(function(v) {
            alert(JSON.stringify(v));
        }, function(err) {
            console.log(err);
        });
    };
};


HealthKit.prototype.getWorkouts = function() {
$scope.getWorkouts = function() {
        $cordovaHealthKit.findWorkouts().then(function(v) {
            alert(JSON.stringify(v));
        }, function(err) {
            console.log(err);
        });
    };
}
