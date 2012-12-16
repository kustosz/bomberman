define("level/Bricks",
       ["level/Block", "level/settings"],
       function (Block, settings) {

           var Bricks = function (board, x, y) {
               this.board = board;
               this.x = x;
               this.y = y;
               this.type = "bricks";
               this.blocking = true;
               this.bomb = null;
               this.flames = null;
               this.passExplosion = false;
           };

           Bricks.prototype = new Block();

           Bricks.prototype.drawing = new Image();
           Bricks.prototype.drawing.src = settings.BRICKS_SRC;


           return Bricks;
       }
);
