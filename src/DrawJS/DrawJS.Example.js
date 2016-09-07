/*

This is a small tutorial to create

*/


// Add following line to add the script into your project
<script src="lib/ionic-i4mi/src/DrawJS/DrawJS.js"></script>


// Add following line to your template to define the needed sector
<canvas id="myCanvas" width="200" height="100"></canvas>


// To draw a circle add in controller file following lines

$config = {
  name: 'myCanvas',
  x: 0,
  y: 0,
  width: 150,
  heigth: 400,
  fillStyle: 'red'
}


var drawJS = new DrawJS();

drawJS.rectangle($config);
