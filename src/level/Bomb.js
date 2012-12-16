define("level/Bomb",
       ["level/settings"],
       function (settings) {

           var Bomb = function (board, x, y) {
               var self = this;
               this.x = x;
               this.y = y;
               this.board = board;

               setTimeout(function () {
                   board.detonateBomb(self);
               }, settings.BOMB_TIMEOUT);

           }

           Bomb.prototype.width = settings.SQUARE_WIDTH;
           Bomb.prototype.height = settings.SQUARE_HEIGHT;

           Bomb.prototype.drawing = new Image();
           Bomb.prototype.drawing.src = settings.BOMB_SRC;

           Bomb.prototype.draw = function () {
               this.board.context.drawImage(this.drawing,
                                            this.x - this.board.offsetX,
                                            this.y - this.board.offsetY);
           }

           return Bomb;
       }
);
