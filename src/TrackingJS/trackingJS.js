var trackingJS = function($scope, $ionicGesture) {

  console.info("fresh");


  $scope.messages = [];
  var touchpad = (angular.element(document.querySelector('#touchpad')));
  var maxFingers = 10;
  var fingers = [];
  for (var i = 0; i < maxFingers; i++)
    fingers.push(angular.element(document.querySelector('#t' + i)))
  $scope.touches = new Array;

  var resetTransformations = function() {
    for (var i = 0; i < maxFingers; i++)
      fingers[i].css({
        "transform": "translate3D(0px, 0px, 0px)"
      });
  }
  $ionicGesture.on('dragstart',
    function(event) {
      $scope.messages.push({
        txt: "dragstart"
      });
    }, touchpad);
  $ionicGesture.on('dragend',
    function(event) {
      $scope.messages.push({
        txt: "dragend"
      });
    }, touchpad);
  $ionicGesture.on('transformstart',
    function(event) {
      $scope.messages.push({
        txt: "transformstart"
      });
    }, touchpad);
  $ionicGesture.on('transformend',
    function(event) {
      $scope.messages.push({
        txt: "transformend"
      });
    }, touchpad);
  // keep track if a finger is released:
  var fingersDown = 0;

  // drag = 1 finger, transform = more
  $ionicGesture.on('transform drag',
    function(event) {
      // reset sprites if a finger is released in the middle of a multitouch (dismisses the unused sprite)
      if (fingersDown > event.gesture.touches.length)
        resetTransformations();
      fingersDown = event.gesture.touches.length;
      // IMPORTANT: hammer.js is already keeping track of touches: just read the event.gesture.touches[i].identifier -- it is not changed for a single touch during multitouch transform even if another finger is released during the transform (the touches[ ] Array is rearranged, so the index of it is of no use). Also worth noting: the identifier can start from 0 or from 1, depending on device being used.
      $scope.touches = [];
      var identifier = 0;
      for (var i = 0; i < event.gesture.touches.length; i++) {
        identifier = parseInt(event.gesture.touches[i].identifier);
        $scope.touches[i] = {
          pageX: parseInt(event.gesture.touches[i].pageX),
          pageY: parseInt(event.gesture.touches[i].pageY),
          id: identifier
        };
        fingers[identifier].css({
          "transform": "translate3D(" + event.gesture.touches[i].pageX + "px, " + event.gesture.touches[i].pageY + "px, 0px)"
        });
      }

      $scope.$apply();
    }, touchpad);


  $ionicGesture.on('release',
    function(event) {
      $scope.touches = [];
      $scope.$apply();
      $scope.messages.push({
        txt: "release"
      });
      resetTransformations();
    }, touchpad);
  $ionicGesture.on('touch',
    function(event) {
      $scope.messages.push({
        txt: "touch"
      });
    }, touchpad);

}
