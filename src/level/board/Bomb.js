define("level/board/Bomb",
       ["utils/Timer",
        "level/board/settings"],
       function (Timer, settings) {

           var Bomb = function (board, x, y) {
               var self = this;
               this.x = x;
               this.y = y;
               this.board = board;

               new Timer(function () {
                   board.detonateBomb(self);
               }, settings.BOMB_TIMEOUT, board.timeouts);

           }

           Bomb.prototype.width = settings.SQUARE_WIDTH;
           Bomb.prototype.height = settings.SQUARE_HEIGHT;

           Bomb.prototype.drawing = new Image();
           Bomb.prototype.drawing.src = settings.BOMB_SRC;

           Bomb.prototype.draw = function () {
               this.board.context.drawImage(this.drawing,
                                            this.x - this.board.offsetX,
                                            this.y - this.board.offsetY + settings.TOPMARGIN);
           }

           return Bomb;
       }
);
