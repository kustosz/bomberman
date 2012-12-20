define("level/Door",
       ["level/settings"],
       function (settings) {

           var Door = function (board, row, col) {
               this.board = board;
               this.row = row;
               this.col = col;
               this.x = this.col * settings.SQUARE_WIDTH;
               this.y = this.row * settings.SQUARE_HEIGHT;
           }

           Door.prototype.drawing = new Image();
           Door.prototype.drawing.src = settings.DOOR_SRC;

           Door.prototype.draw = function () {
               if (this.board.blocks[this.row][this.col].type === "empty") {
                   this.board.context.drawImage(this.drawing,
                                                this.x - this.board.offsetX,
                                                this.y - this.board.offsetY);
               }
           }

           return Door;

       }

);
