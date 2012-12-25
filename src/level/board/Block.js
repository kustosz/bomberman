define("level/board/Block",
       ["level/board/settings"],
       function (settings) {

           var Block = function () {
               this.width = settings.SQUARE_WIDTH;
               this.height = settings.SQUARE_HEIGHT;
           }

           Block.prototype.draw = function () {
               var x = this.x * this.board.scale - this.board.offsetX,
                   y = this.y * this.board.scale - this.board.offsetY,
                   width = (this.width * this.board.scale),
                   height = (this.height * this.board.scale);
               this.board.context.drawImage(this.drawing,
                                            x, y + settings.TOPMARGIN,
                                            width, height);
           }

           return Block;
       }
);
