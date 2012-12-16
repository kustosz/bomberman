define("level/Block",
       ["level/settings"],
       function (settings) {

           var Block = function () {
               this.width = settings.SQUARE_WIDTH;
               this.height = settings.SQUARE_HEIGHT;
           }

           Block.prototype.draw = function () {
               this.board.context.drawImage(this.drawing,
                                            this.x - this.board.offsetX,
                                            this.y - this.board.offsetY);
           }

           return Block;
       }
);
