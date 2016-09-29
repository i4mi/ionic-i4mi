# Implement Module MIDATA
This module has the most important functions to work with MIDATA.


1. Add the script reference to your *index.html*

```sh

<script src="lib/ionic-i4mi/dist/i4mitest.bundle.min.js"></script>

```

# Usage

*Connect*


1. The login form with the logic behind can easily be integrated with the following line.

```sh

  <i4mi-midata-login user="user" controller-name="I4MIMidataLoginController"></i4mi-midata-login>

```


2. Now we need some information in our controller


```sh

.controller('ExampleCtrl', function($scope, I4MIMidataService) {

  // Use for testing the development enviroment
  $scope.user = {
    server: 'https://test.midata.coop:9000'
  }

  // Connect with me Data
  $scope.loggedIn = I4MIMidataService.loggedIn();


})

```
