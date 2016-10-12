var ChartJS = function(config)
{
  $config = config;


  // Change value from weekly

  if ($config['labels'] == "Day"){
      $config['labels'] = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'];
  }


  if ($config['labels'] == 'Week'){
      $config['labels'] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  if ($config['labels'] == "Month "){
      $config['month'] = 2;
      $config['year'] = 2016;
      $config['labels'] = "";
  }

  if ($config['labels'] == "Year"){
      $config['labels'] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  console.log($config['labels']);
}

ChartJS.prototype.line = function() {
  new Chartist.Line($config['name'], {
    labels: $config['labels'],
    series: [
        [12, 9, 7, 8, 5, 9, 9],
        [2, 1, 3.5, 7, 3, 9, 9],
        [1, 3, 4, 5, 6, 9, 9]
      ]
    }, {
    fullWidth: $config["fullWidth"],
    low: 0,
    showArea: $config["showArea"],
    chartPadding: {
      right: 40
    }
  });
};



ChartJS.prototype.bar = function() {
  var data = {
    labels: $config['labels'],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]
    ]
  };

  var options = {
    seriesBarDistance: 10
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  new Chartist.Bar($config['name'], data, options, responsiveOptions);
};



ChartJS.prototype.pie = function(data) {
  var sum = function(a, b) { return a + b };
  new Chartist.Pie('.ct-chartPie', data, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / data.series.reduce(sum) * 100) + '%';
    }
  });

};
