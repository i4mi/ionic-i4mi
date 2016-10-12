

var DrawJS = function (config){
  $config = config;
  //console.info(config);
  c = document.getElementById(config['id']);
  ctx = c.getContext("2d");

}


DrawJS.prototype.circle = function(){
  var centerX = c.width / 2;
  var centerY = c.height / 2;
  var radius = $config['radius'];

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = $config['fillStyle'];

  if ($config['fill'] !== undefined){
    ctx.fill();
  }

  ctx.lineWidth = $config['lineWidth'];
  ctx.strokeStyle = $config['strokeStyle'];
  ctx.stroke();
};


DrawJS.prototype.rectangle = function(){
       ctx.beginPath();
       var width = c.width;
       var height = c.height;

       ctx.rect(10, 10, width, height);
       ctx.fillStyle = $config['fillStyle'];

       if ($config['fill'] !== undefined){
         ctx.fill();
       }

       ctx.lineWidth = $config['lineWidth'];
       ctx.strokeStyle = $config['strokeStyle'];
       ctx.stroke();
};

DrawJS.prototype.line = function(){

        ctx.beginPath();
        ctx.moveTo($config['moveToX'], $config['moveToY']);
        ctx.lineTo($config['lineToX'], $config['lineToY']);
        ctx.lineWidth = $config['lineWidth'];

        // set line color
        ctx.strokeStyle = $config['strokeStyle'];
        ctx.stroke();
};


DrawJS.prototype.text = function(){
       var x = c.width / 2;
       var y = c.height / 2;

       ctx.font = $config['font'];
       // textAlign aligns text horizontally relative to placement
       ctx.textAlign = $config['textAlign'];
       // textBaseline aligns text vertically relative to font style
       ctx.textBaseline = $config['textBaseline'];
       ctx.fillStyle = $config['fillStyle'];

       if ($config['fill'] !== undefined){
         ctx.fill();
       }
       ctx.fillText($config['text'], x, y);
};


DrawJS.prototype.drawImage = function(){
        var x = 0;
        var y = 0;
        var imageObj = new Image();
        imageObj.onload = function() {
          ctx.drawImage(imageObj, x, y);
        };
        imageObj.src = $config['src'];

};



DrawJS.prototype.triangle = function(){
  ctx.beginPath();

  ctx.moveTo($config['moveToX'], $config['moveToY']);

  ctx.lineTo($config['lineToX'], $config['lineToY']);
  ctx.lineTo($config['lineToY'], $config['lineToX']);

  ctx.closePath();

  // the outline
  ctx.lineWidth = $config['lineWidth'];
  ctx.strokeStyle = $config['strokeStyle'];
  ctx.stroke();

  // the fill color
  ctx.fillStyle = $config['fillStyle'];
  if ($config['fill'] !== undefined){
    ctx.fill();
  }
};
