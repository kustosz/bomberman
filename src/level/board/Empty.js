define("level/board/Empty",
       ["level/board/Block", "level/board/settings"],
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
               this.drawing = BOMBERMAN.assets.emptyIMG;
           };

           Empty.prototype = new Block();
           return Empty;
       }
);
