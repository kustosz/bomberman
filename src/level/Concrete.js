define("level/Concrete",
       ["level/Block", "level/settings"],
       function (Block, settings) {

           var Concrete = function (board, x, y) {
               this.board = board;
               this.x = x;
               this.y = y;
               this.type = "concrete";
               this.blocking = true;
               this.bomb = null;
               this.flame = null;
               this.passExplosion = false;
           };

           Concrete.prototype = new Block();

           Concrete.prototype.drawing = new Image();
           Concrete.prototype.drawing.src = settings.CONCRETE_SRC;

           Concrete.prototype.detonate = function () {
               return this.passExplosion;
           };

           return Concrete;
       }
);
