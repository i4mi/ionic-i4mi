# ChartJS

## Implement ChartJS

1. Add script reference to your *index.html*

```sh

<link rel="stylesheet"  href="lib/chartist/dist/chartist.min.css">
<script src="lib/chartist/dist/chartist.min.js"></script>
<script src="lib/ionic-i4mi/src/ChartJS/chartJS.js"></script>

```

## Usage

### Create a chart (Note this is an example!)
1. To create a chart add in your template.html files (e.g chart.html)

```sh

<div class="ct-chartLine ct-perfect-fourth"></div>
<div class="ct-chartBar ct-perfect-fourth"></div>
<div class="ct-chartPie ct-perfect-fourth"></div>

```

2. Now let's create a chartJS object


```sh

.controller('ExampleCtrl', function($scope,I4MIMidataService) {

configLine =
  {
    name: '.ct-chart',
    labels: 'Week',
    series: '[5, 3, 4]'
  };

var chartLine  = new ChartJS(configLine);
var chartBar   = new ChartJS(configBar);
var chartPie   = new ChartJS(configPie);

// Draw chart
chartLine.line();
chartBar.bar();
chartPie.pie();

})
```
