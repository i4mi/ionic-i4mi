

var DrawJS = function (config){
  config = config;
  c = document.getElementById($config['name']);
  ctx = c.getContext("2d");
}


DrawJS.prototype.circle = function(){
  ctx.beginPath();
  ctx.arc($config['x'], $config['y'],40,0,2*Math.PI);
  ctx.stroke();
};

DrawJS.prototype.rectangle = function(){
  ctx.fillStyle = $config['fillStyle'];
  ctx.fillRect($config['x'], $config['y'], $config['width'], $config['heigth']);
};

DrawJS.prototype.line = function(){
  ctx.moveTo($config['x'], $config['y']);
  ctx.lineTo($config['toX'], $config['toY']);
  ctx.stroke();
};


DrawJS.prototype.text = function(){
  ctx.font = $config['font'];
  ctx.fillText($config['text'], $config['x'], $config['y']);
};


DrawJS.prototype.drawImage = function(){
  var img = $config['img'];
  ctx.drawImage(img, $config['x'], $config['y']);
};
