# DrawJS

# Implement Module DrawJS

Add following script reference in your index.html file

```sh

<script src="lib/ionic-i4mi/src/DrawJS/DrawJS.js"></script>

```

## Usage

1. Add in your *template file* following lines

```sh

<canvas id="example" width="200" height="100"></canvas>

```

### Create a Circle

To create a circle we need following lines in our controller

```sh

var $configCircle = {
  id : "example1",
  radius : "70",
  fillStyle : 'red',
  fill : 'true',
  lineWidth : 5,
  strokeStyle : 'yellow'
};
var example = new DrawJS($configCircle);
example.circle();

```


### Create a rectangle

To create a circle we need following lines in our controller

```sh

var $configRect = {
  id : "example",
  fillStyle : "yellow",
  fill : "true",
  lineWidth : 7,
  strokeStyle : 'yellow'
};
var example = new DrawJS($configRect);
example.rectangle();

```


### Create a triangle

To create a circle we need following lines in our controller

```sh

var $configTriangle = {
  id : "example",
  fillStyle: "blue",
  moveToX : 0,
  moveToY : 0,
  lineToX : 0,
  lineToY : 90,
  fill : "true",
  lineWidth : 10,
  strokeStyle : 'blue'
};
var example = new DrawJS($configTriangle);
example.triangle();

```


### Create a line

To create a circle we need following lines in our controller

```sh

var $configLine = {
  id : "example",
  moveToX : 0,
  moveToY : 50,
  lineToX : 450,
  lineToY : 50,
  fill : "true",
  lineWidth : 7,
  strokeStyle : 'red'
};
var example = new DrawJS($configLine);
example.line();

```

### Draw a text

To create a circle we need following lines in our controller

```sh

var $configText = {
  id : "example",
  text: 'Draw Text',
  textAlign: 'center',
  textBaseline: 'middle',
  font: '30pt Calibri',
  fillStyle: "blue",
};

var example = new DrawJS($configText);
example.text();

```


### Draw an image

To create a circle we need following lines in our controller

```sh

var $configImage = {
  id : "example",
  src : 'https://www.midata.coop/img/smo/midata-tr.png',
};
var example = new DrawJS($configImage);
example6.drawImage();

```
