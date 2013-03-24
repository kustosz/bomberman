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
               this.drawing = BOMBERMAN.assets.bombIMG;

           }

           Bomb.prototype = new Block();

           return Bomb;
       }
);
