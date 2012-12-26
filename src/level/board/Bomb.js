define("level/board/Bomb",
       ["utils/Timer",
        "level/board/settings"],
       function (Timer, settings) {

           var Bomb = function (board, x, y) {
               var self = this;
               this.x = x;
               this.y = y;
               this.board = board;

               if (!this.board.skills.detonator) {
                   new Timer(function () {
                       board.detonateBomb(self);
                   }, settings.BOMB_TIMEOUT, board.timeouts, true);
               }

           }

           Bomb.prototype.width = settings.SQUARE_WIDTH;
           Bomb.prototype.height = settings.SQUARE_HEIGHT;

           Bomb.prototype.drawing = new Image();
           Bomb.prototype.drawing.src = settings.BOMB_SRC;

           Bomb.prototype.draw = function () {
               var x = this.x * this.board.scale - this.board.offsetX,
                   y = this.y * this.board.scale - this.board.offsetY,
                   width = (this.width * this.board.scale),
                   height = (this.height * this.board.scale);
               this.board.context.drawImage(this.drawing,
                                            x, y + settings.TOPMARGIN,
                                            width, height);
           }

           return Bomb;
       }
);
