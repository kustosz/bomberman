define("level/board/Flames",
       ["utils/Timer",
        "level/board/Block",
        "level/board/settings"],
       function (Timer, Block, settings) {

           var Flames = function (board, x, y) {
               var self = this;
               this.x = x;
               this.y = y;
               this.board = board;

               new Timer(function () {
                   board.deleteFlames(self);
               }, settings.FLAMES_TIMEOUT, board.timeouts);
           }


           Flames.prototype = new Block();

           Flames.prototype.drawing = new Image();
           Flames.prototype.drawing.src = settings.FLAMES_SRC;

           return Flames;
       }
);
