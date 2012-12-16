define("level/Empty",
       ["level/Block", "level/settings"],
       function (Block, settings) {

           var Empty = function (board, x, y) {
               this.board = board;
               this.x = x;
               this.y = y;
               this.type = "empty";
               this.blocking = false;
               this.bomb = null;
               this.flames = null;
               this.passExplosion = true;
           };

           Empty.prototype = new Block();

           Empty.prototype.drawing = new Image();
           Empty.prototype.drawing.src = settings.EMPTY_SRC;

           return Empty;
       }
);
