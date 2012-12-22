define("level/blackboard/blackboard",
       ["level/blackboard/settings"],
       function (settings) {

           return function (context, text, callback, timeout) {
               var width = context.canvas.width,
                   height = context.canvas.height;
               context.fillStyle = settings.BACKGROUND_COLOR;
               context.fillRect(0, 0, width, height);
               context.fillStyle = settings.FILL_STYLE;
               context.font = settings.FONT_STYLE;
               context.textAlign = settings.TEXT_ALIGN;
               context.textBaseline = settings.TEXT_BASELINE;
               context.fillText(text, width / 2, height / 2);

               setTimeout(function () {
                   callback();
               }, timeout);
           }
       }
);



