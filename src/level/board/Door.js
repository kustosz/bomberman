define("level/board/Door",
       ["level/board/settings"],
       function (settings) {

           var Door = function (board, row, col) {
               this.width = settings.SQUARE_WIDTH;
               this.height = settings.SQUARE_HEIGHT;
               this.board = board;
               this.row = row;
               this.col = col;
               this.x = this.col * settings.SQUARE_WIDTH;
               this.y = this.row * settings.SQUARE_HEIGHT;
               this.opened = false;
               this.drawing = BOMBERMAN.assets.doorIMG;
               this.drawingOpened = BOMBERMAN.assets.door_openedIMG;
           }

           Door.prototype.draw = function () {
               var x = this.x * this.board.scale - this.board.offsetX,
                   y = this.y * this.board.scale - this.board.offsetY,
                   width = (this.width * this.board.scale),
                   height = (this.height * this.board.scale);
               if (this.board.blocks[this.row][this.col].type === "empty") {
                   if (this.opened) {
                       this.board.context.drawImage(this.drawingOpened,
                                                    x, y + settings.TOPMARGIN,
                                                    width, height);
                   } else {
                       this.board.context.drawImage(this.drawing,
                                                    x, y + settings.TOPMARGIN,
                                                    width, height);
                   }
               }
           }

           return Door;

       }

);
