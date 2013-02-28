define("level/board/Bomb",
       ["utils/Timer",
        "level/board/Block",
        "level/board/settings"],
       function (Timer, Block, settings) {

           var Bomb = function (board, x, y) {
               var self = this;
               this.x = x;
               this.y = y;
               this.board = board;

               if (!this.board.skills.detonator) {
                   this.timeout = new Timer(function () {
                       board.detonateBomb(self);
                   }, settings.BOMB_TIMEOUT, board.timeouts, true);
               }

           }

           Bomb.prototype = new Block();

           Bomb.prototype.drawing = new Image();
           Bomb.prototype.drawing.src = settings.BOMB_SRC;

           return Bomb;
       }
);
