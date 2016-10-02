
# ionic-i4mi Version 0.1.1
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
1. Add the *i4mi-Bundle* in your *index.html*

```sh

<script src="lib/ionic-i4mi/src/Midata/dist/i4mi.bundle.min.js"></script>

```

# Documentation
An Ionic documentation is <a href="https://drive.switch.ch/index.php/s/IoNNypBX4jnZTru">here</a> available.


# License
Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.  


# Examples
<a href="https://github.com/i4mi/hello-i4mi">Hello I4MI</a>
<a href="https://github.com/i4mi/mhealth">mHealth</a>
