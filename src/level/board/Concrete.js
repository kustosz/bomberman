define("level/board/Concrete",
       ["level/board/Block", "level/board/settings"],
       function (Block, settings) {

           var Concrete = function (board, x, y) {
               this.board = board;
               this.x = x;
               this.y = y;
               this.type = "concrete";
               this.blocking = true;
               this.bomb = null;
               this.flames = null;
               this.passExplosion = false;
               this.drawing = BOMBERMAN.assets.concreteIMG;
           };

           Concrete.prototype = new Block();

           return Concrete;
       }
);
