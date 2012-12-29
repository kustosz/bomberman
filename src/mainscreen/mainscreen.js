define("mainscreen/mainscreen",
       ["mainscreen/settings"],
       function (settings) {

           return function (context, callback) {
               var draw = function () {
                   var scale = Math.min(context.canvas.width / settings.BASE_WIDTH,
                                        context.canvas.height / settings.BASE_HEIGHT);
                   var img = new Image();
                   img.src = settings.IMAGE_SRC;
                   var x = (context.canvas.width - settings.MAIN_WIDTH * scale) / 2,
                       y = (context.canvas.height - settings.MAIN_HEIGHT * scale) / 2;
                   img.onload = function () {
                       context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                       context.drawImage(img, x, y, settings.MAIN_WIDTH * scale,
                                         settings.MAIN_HEIGHT * scale);
                   }
               }
               var running = false;
               draw();
               var resize = window.onresize;
               window.onresize = function () {
                   resize();
                   draw();
               }
               document.onkeydown = function (e) {
                   if (e.keyCode === 32 && !running) {
                       running = true;
                       window.onresize = resize;
                       callback();
                   }
               }
           }
       }
);


