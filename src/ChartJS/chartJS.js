var ChartJS = function(config)
{
  this.config = config;


  // Change value from weekly

  if (config['labels'] = "Day"){
      config['labels'] = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '0'];
  }


  if (config['labels'] = "Week"){
      config['labels'] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  if (config['labels'] = "Month "){
      config['month'] = 2;
      config['year'] = 2016;
      config['labels'] = "";
  }

  if (config['labels'] = "Year"){
      config['labels'] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }



}

ChartJS.prototype.line = function() {
console.info("Create a ChartJS-Line-Object");

var data = {
  labels: config['labels'],
  series: [config['series']]
};

new Chartist.Line(config['name'], data);


};

ChartJS.prototype.bar = function($config) {
console.info("Create a ChartJS-Bar-Object");

new Chartist.Bar(config['name'], {
  labels: config['labels'],
  series: [config['series']
  ]
}, {
  axisX: {
    position: 'start'
  },
  axisY: {
    position: 'end'
  }
});
};



ChartJS.prototype.pie = function($config) {
console.info("Create a ChartJS-pie-Object");
var data = {
  series: config['series']
};
var sum = function(a, b) { return a + b };
new Chartist.Pie(config['name'], data, {
  labelInterpolationFnc: function(value) {
    return Math.round(value / data.series.reduce(sum) * 100) + '%';
  }
});
};
