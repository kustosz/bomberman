define("level/board/Powerup",
       ["level/board/settings"],
       function (settings) {

           var Powerup = function (board, row, col, type) {
               this.board = board;
               this.row = row;
               this.col = col;
               this.x = this.col * settings.SQUARE_WIDTH;
               this.y = this.row * settings.SQUARE_HEIGHT;
               this.used = false;
               this.type = type;
           }

           Powerup.prototype.drawings = {};

           Powerup.prototype.drawings["addBomb"] = new Image();
           Powerup.prototype.drawings["addBomb"].src = settings.ADDBOMB_SRC;

           Powerup.prototype.drawings["increaseRange"] = new Image();
           Powerup.prototype.drawings["increaseRange"].src = settings.INCREASERANGE_SRC;

           Powerup.prototype.draw = function () {
               if (this.used) {
                   return;
               }
               if (this.board.blocks[this.row][this.col].type === "empty") {
                   this.board.context.drawImage(this.drawings[this.type],
                                                this.x - this.board.offsetX,
                                                this.y - this.board.offsetY + settings.TOPMARGIN);
               }
           }

           return Powerup;
       }
);




