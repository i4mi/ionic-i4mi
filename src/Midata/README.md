# MIDATA
This module has the most important functions to work with MIDATA.


## Implement MIDATA

1. Add the script reference to your *index.html*

```sh

<script src="lib/ionic-i4mi/src/Midata/dist/i4mi.bundle.min.js"></script>

```

## Usage

### Connect


1. The login form with the logic behind can easily  integrated with the following line in your template file (e.g login.html).

```sh

  <i4mi-midata-login user="user" controller-name="I4MIMidataLoginController"></i4mi-midata-login>

```

2. Now we need in our controller some additional information.

```sh

.controller('ExampleCtrl', function($scope, I4MIMidataService) {

  // Use for testing the development environment
  $scope.user = {
    server: 'https://test.midata.coop:9000'
  }

  // Connect with MIDATA
  $scope.loggedIn = I4MIMidataService.loggedIn();
})

```


3. Add an *APPNAME* and an *APPSECRET*

angular.module('starter', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi', 'starter.controllers', 'starter.services','jsonFormatter'])
.constant('APPNAME', 'HelloI4MI')
.constant('APPSECRET', '8385bee7542099b10315dcb7b803b61a')


### Create

1. Let's integrated the form to create some entries


```sh

<i4mi-midata-entry clear="true" controller-name="I4MIMidataEntryController" model="entry" fields="entryFields" fhir="fhirGroup" group-entry="true"></i4mi-midata-entry>

```

2. In the controller file we implement the fields that we need (Note: This is an example with *weight* and *steps*)

```sh
.controller('ExampleCtrl', function($scope, I4MIMidataService) {
  $scope.entry = {};

    $scope.entryFields = [
      {
        key: 'weight',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Weight [kg]',
          placeholder: 200
        }
      },
      {
        key: 'steps',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Steps',
          placeholder: 10000
        }
      }
    ]

    $scope.fhirGroup = {
      name: "Gruppe",
      format: "fhir/Observation",
      subformat: "String",
      content: "http://loinc.org 61150-9",
      data: {
        "resourceType": "Observation",
        "status": "preliminary",
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/ValueSet/observation-category",
                "code": "survey",
                "display": "Survey"
                }
          ]
        },
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
                "code": "61150-9",
                "display": "Subjective Narrative"
                }
          ]
        },
        $set: "valueString"
      }
    }

    $scope.fhir = {
      weight: {
        name: "Gewicht",
        format: "fhir/Observation",
        subformat: "Quantity",
        content: "http://loinc.org 3141-9",
        data: {
          "resourceType": "Observation",
          "status": "preliminary",
          "category": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/ValueSet/observation-category",
                  "code": "vital-signs",
                  "display": "Vital Signs"
                  }
            ]
          },
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                  "code": "3141-9",
                  "display": "Body weight Measured"
                  }
            ]
          },
          "valueQuantity":  {
            "unit": "kg",
            "system": "http://unitsofmeasure.org",
            "code": "kg"
          },
          $set: "valueQuantity.value"
        }
      },
      steps: {
        name: "Schritte",
        format: "fhir/Observation",
        subformat: "Quantity",
        content: "http://loing.org 55423-8",
        data: {
          "resourceType": "Observation",
          "status": "preliminary",
          "category": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/ValueSet/observation-category",
                "code": "vital-signs",
                "display": "Vital Signs"
              }
            ]
          },
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                  "code": "55423-8",
                  "display": "Number of steps in unspecified time Pedometer"
                  }
            ]
          },
          "valueQuantity":  {
            "unit": "steps",
            "system": "http://midata.coop",
            "code": "steps"
          },
          $set: "valueQuantity.value"
        }
      }
    }

    $scope.showEntryModal = function() {
      I4MIMidataService.newEntry($scope.entry, $scope.entryFields, $scope.fhir, {/* options */});
    }
})
```
### Read
1. To search/get for data add following lines in your controller
```sh

.controller('ExampleCtrl', function($scope, I4MIMidataService) {
  I4MIMidataService.search().then(function(response){
		$scope.records = response.data;
	},function(reason) {
	});
  ...
})

```

#### List (Note: This is an example)
1. To see your data in a list view
```sh

<i4mi-list records="records" show-key can-remove keys="status,valueQuantity,code"></i4mi-list>

```

#### Chart (Note: This is a example)
1. To see your data in a chart view

```sh

<i4mi-chart controller-name="I4MIMidataChartController" records="records" interval="day" operation="avg" type="lineChart"></i4mi-chart>

```
