define("level/board/Flames",
       ["level/board/settings"],
       function (settings) {

           var Flames = function (board, x, y) {
               var self = this;
               this.x = x;
               this.y = y;
               this.board = board;

               setTimeout(function () {
                   board.deleteFlames(self);
               }, settings.FLAMES_TIMEOUT);
           }

           Flames.prototype.width = settings.SQUARE_WIDTH;
           Flames.prototype.height = settings.SQUARE_HEIGHT;

           Flames.prototype.drawing = new Image();
           Flames.prototype.drawing.src = settings.FLAMES_SRC;

           Flames.prototype.draw = function () {
               this.board.context.drawImage(this.drawing,
                                            this.x - this.board.offsetX,
                                            this.y - this.board.offsetY + settings.TOPMARGIN);
           }

           return Flames;
       }
);
