define("level/board/Powerup",
       ["level/board/settings"],
       function (settings) {

           var Powerup = function (board, row, col, type) {
               this.board = board;
               this.row = row;
               this.col = col;
               this.x = this.col * settings.SQUARE_WIDTH;
               this.y = this.row * settings.SQUARE_HEIGHT;
               this.width = settings.SQUARE_WIDTH;
               this.height = settings.SQUARE_HEIGHT;
               this.used = false;
               this.type = type;
               this.drawing = BOMBERMAN.assets[type + "IMG"];
           }

           Powerup.prototype.draw = function () {
               var x = this.x * this.board.scale - this.board.offsetX,
                   y = this.y * this.board.scale - this.board.offsetY,
                   width = (this.width * this.board.scale),
                   height = (this.height * this.board.scale);
               if (this.used) {
                   return;
               }
               if (this.board.blocks[this.row][this.col].type === "empty") {
                   this.board.context.drawImage(this.drawing,
                                                x, y + settings.TOPMARGIN,
                                                width, height);
               }
           }

           return Powerup;
       }
);




