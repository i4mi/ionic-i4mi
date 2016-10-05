
# ionic-i4mi Version 0.1.2
Ionic I4MI is a collection of AngularJS services and directives for Ionic framework to enable fast prototyping of apps integrating the MIDATA.coop platform. The i4mi module is developed and maintained by the Institute for Medical Informatics (I4MI, http://www.ti.bfh.ch/de/bachelor/medizininformatik.html) at Berner Fachhochschule (BFH, http://www.bfh.ch) and is intended to support its students with their semester projects.

# Prerequisites
- Node.js v4.5.*
- Bower v1.7.*
- Ionic v1.*
- Cordova v6.3.*


# Installation
1. Open terminal
2. Go with *cd* into your project folder

3. Install the framework with bower (If bower is not installed, please install *bower with npm install -g bower*)

```sh

$ bower install ionic-i4mi

```


4. Install node-modules and bower components
```sh
$ npm install
$ bower install
$ ionic state restore
```
Now you can find the framework in www/lib


# Usage
Add the *i4mi-Bundle* in your *index.html*

```sh

<!-- ADD DEPENDENCIES LINKS -->
<script src="lib/ionic-i4mi/src/Midata/dist/i4mi.bundle.min.js"></script>
<script src="lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js"></script>
<script src="lib/ionic-timepicker/dist/ionic-timepicker.bundle.min.js"></script>
<script src="lib/d3/d3.js"></script>
<script src="lib/nvd3/build/nv.d3.js"></script>
<script src="lib/angular-nvd3/dist/angular-nvd3.js"></script>
<script src="lib/ngstorage/ngStorage.min.js"></script>
<script src="lib/api-check/dist/api-check.min.js"></script>
<script src="lib/angular-formly/dist/formly.min.js"></script>
<script src="lib/angular-formly-templates-ionic/dist/angular-formly-templates-ionic.js"></script>
<script src="lib/cryptojslib/rollups/aes.js"></script>
<script src="lib/angular-cryptography/mdo-angular-cryptography.js"></script>
<script src="lib/json-formatter/dist/json-formatter.js"></script>

```


Add new modules in your *app.js* and a new AppSecret to communicate with

```sh

angular.module('starter', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi', 'starter.controllers', 'starter.services','jsonFormatter'])

```


# Documentation
A documentation about ionic is <a href="https://drive.switch.ch/index.php/s/IoNNypBX4jnZTru">here</a> available.


# License
Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.  
