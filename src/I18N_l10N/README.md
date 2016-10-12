# I18N

# Implement Module I18N

## Install Angular-Translate

1. Open the terminal and navigate to your project root folder

2. Install cordova plugin *angular-translate*

```sh

$ bower install --save angular-translate

```

1. Take also advantage of *angular-translate static file loader*

```sh

bower install --save angular-translate-loader-static-files
```

2. Modify your *index.html* to implement *angular-translate* and some other scripts

```sh

<script src="lib/angular/angular.js"></script>
<script src="lib/angular-animate/angular-animate.js"></script>
<script src="lib/angular-sanitize/angular-sanitize.js"></script>
<script src="lib/angular-ui-router/release/angular-ui-router.js"></script>
<script src="lib/ionic/js/ionic.js"></script>
<script src="lib/ionic/js/ionic-angular.js"></script>
<script src="lib/angular-translate/angular-translate.js"></script>
<script src="lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>


```

1. Modify your *app.js* add *pascalprecht.translate* module

```sh

angular.module('starter', ['ionic', 'pascalprecht.translate'])
  .config(function($ionicConfigProvider, $stateProvider,
    $urlRouterProvider, $translateProvider) {

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
        'de' : 'de', 'de_DE': 'de', 'de_CH': 'de'
      })
      .preferredLanguage('de')
      .fallbackLanguage('de')
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');

```

2. Now we need some *json files* to save our strings. You can copy the folder *locales* into your *www* folder. There are two files (en.json & de.json)

3. Let's get the strings. Include following in your *template* file

```sh

<button class="button button-full button-positive" ng-click="switchLanguage('de_CH')">DE</button>
<button class="button button-full button-positive" ng-click="switchLanguage('en_GB')">EN</button>

<div class="title title-left padding-left">
  <small translate="EXAMPLE"></small>
</div>

```

Add in your controller following logic

```sh

.controller('ExampleCtrl', function($scope, $translate) {
  $scope.switchLanguage = function(key) {
    $translate.use(key);
  };
});

```
