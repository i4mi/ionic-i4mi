# ChartJS

## Implement ChartJS

1. Add script reference to your *index.html*

```sh

<!-- Add ChartJS references -->
<link rel="stylesheet"  href="lib/chartist/dist/chartist.min.css">
<script src="lib/chartist/dist/chartist.min.js"></script>
<script src="lib/ionic-i4mi/src/ChartJS/chartJS.js"></script>

```

## Usage

### Create a chart (Note this is an example!)
To create a chart add in your template.html files (e.g chart.html)

```sh

<div class="ct-chartExample ct-perfect-fourth"></div>

```

#### Line
Add following lines in your controller to create a line chart

```sh

var $configLine = {
  name: '.ct-chartLine',
  labels: 'Week',
  series: "[12, 9, 7, 8, 5, 9, 0]",
  fullWidth: "true",
  showArea: "true",
};

var chartLine = new ChartJS($configLine);
chartLine.line();

})
```
$
#### pie
Add following lines in your controller to create a pie chart

```sh

var $configPie = {
  name: '.ct-chartPie',
};

var data = {
  series: [5, 3, 4]
};
var chartPie = new ChartJS($configPie);
chartPie.pie(data);

})
```



#### Bar
Add following lines in your controller to create a bar chart

```sh

var $configBar = {
  name: '.ct-chartBar',
  labels: 'Year',
  series: '[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]',
};
var chartBar = new ChartJS($configBar);
chartBar.bar();

```
