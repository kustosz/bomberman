define("level/board/Flames",
       ["utils/Timer",
        "level/board/settings"],
       function (Timer, settings) {

           var Flames = function (board, x, y) {
               var self = this;
               this.x = x;
               this.y = y;
               this.board = board;

               new Timer(function () {
                   board.deleteFlames(self);
               }, settings.FLAMES_TIMEOUT, board.timeouts);
           }

           Flames.prototype.width = settings.SQUARE_WIDTH;
           Flames.prototype.height = settings.SQUARE_HEIGHT;

           Flames.prototype.drawing = new Image();
           Flames.prototype.drawing.src = settings.FLAMES_SRC;

           Flames.prototype.draw = function () {
               var x = this.x * this.board.scale - this.board.offsetX,
                   y = this.y * this.board.scale - this.board.offsetY,
                   width = (this.width * this.board.scale),
                   height = (this.height * this.board.scale);
               this.board.context.drawImage(this.drawing,
                                            x, y + settings.TOPMARGIN,
                                            width, height);
           }

           return Flames;
       }
);
