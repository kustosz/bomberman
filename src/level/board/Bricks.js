define("level/board/Bricks",
       ["level/board/Block", "level/board/settings"],
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
               this.drawing = BOMBERMAN.assets.bricksIMG;
           };

           Bricks.prototype = new Block();
           return Bricks;
       }
);
