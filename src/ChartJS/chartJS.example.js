/*

This is an example how to create a chart with ionic-i4mi.

*/



// Add following lines in your index.html file
<link rel="stylesheet"  href="lib/chartist/dist/chartist.min.css">
<script src="lib/chartist/dist/chartist.min.js"></script>
<script src="lib/ionic-i4mi/src/ChartJS/chartJS.js"></script>



// Add following lines in your template file
<div class="ct-chart ct-perfect-fourth"></div>


// To create a new chart add following line in your controller File


.controller('ExampleCtrl', function($scope,I4MIMidataService) {


config = {
  name: '.ct-chart1',
  labels: 'Week',
  series: '[5, 3, 4]'
};

var LineChart = new ChartJS(config);
// Create a new Line ChartJS
LineChart.line();

...


})
