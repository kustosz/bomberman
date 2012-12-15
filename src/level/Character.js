define("level/Character",
       ["level/settings"],
       function (settings) {

           var Character = function (board, options) {
               this.board = board;
               this.x = settings.CHARACTER_INITIAL_X;
               this.y = settings.CHARACTER_INITIAL_Y;
               this.width = settings.CHARACTER_WIDTH;
               this.height = settings.CHARACTER_HEIGHT;
               this.speedX = 0;
               this.speedY = 0;
               this.baseSpeed = options.characterBaseSpeed;
           }

           Character.prototype.drawing = new Image();
           Character.prototype.drawing.src = settings.CHARACTER_SRC;

           Character.prototype.update = function () {
           }

           Character.prototype.draw = function () {
               this.board.context.drawImage(this.drawing,
                                            this.x - this.board.offsetX,
                                            this.y - this.board.offsetY);
           }

           return Character;
       }
);




