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
               this.directions = {
                   left: 0,
                   right: 0,
                   up: 0,
                   down: 0
               };
               this.baseSpeed = options.characterBaseSpeed;
           }

           Character.prototype.drawing = new Image();
           Character.prototype.drawing.src = settings.CHARACTER_SRC;

           Character.prototype.update = function () {
               var collide;
               this.speedX = this.directions.right * this.baseSpeed;
               this.speedX -= this.directions.left * this.baseSpeed;
               this.speedY = this.directions.down * this.baseSpeed;
               this.speedY -= this.directions.up * this.baseSpeed;

               if (this.speedX > 0) {
                   collide = this.board.detectCollisions(this.x + this.speedX, this.y,
                                                         this.width, this.height,
                                                         "right");
                   if (!collide) {
                       this.x += this.speedX;
                   } else {
                       this.x = (Math.floor(this.x / settings.SQUARE_WIDTH) + 1) *
                                    settings.SQUARE_WIDTH - this.width - 1;
                   }
               } else if (this.speedX < 0) {
                   collide = this.board.detectCollisions(this.x + this.speedX, this.y,
                                                         this.width, this.height,
                                                         "left");
                   if (!collide) {
                       this.x += this.speedX;
                   } else {
                       this.x = Math.floor(this.x / settings.SQUARE_WIDTH) *
                                    settings.SQUARE_WIDTH + 1;
                   }
               }

               if (this.speedY > 0) {
                   collide = this.board.detectCollisions(this.x, this.y + this.speedY,
                                                         this.width, this.height,
                                                         "down");
                   if(!collide) {
                       this.y += this.speedY;
                   } else {
                       this.y = (Math.floor(this.y / settings.SQUARE_HEIGHT) + 1) *
                                    settings.SQUARE_HEIGHT - this.height - 1;
                   }
               } else if (this.speedY < 0) {
                   collide = this.board.detectCollisions(this.x, this.y + this.speedY,
                                                         this.width, this.height,
                                                         "up");
                   if(!collide) {
                       this.y += this.speedY;
                   } else {
                       this.y = Math.floor(this.y / settings.SQUARE_HEIGHT) *
                                    settings.SQUARE_HEIGHT + 1;
                   }
               }

           }

           Character.prototype.draw = function () {
               this.board.context.drawImage(this.drawing,
                                            this.x - this.board.offsetX,
                                            this.y - this.board.offsetY);
           }

           Character.prototype.handleKeyup = function (keyCode) {

               switch (keyCode) {
               case 37:
                   this.directions.left = 0;
                   return false;
               case 39:
                   this.directions.right = 0;
                   return false;
               case 40:
                   this.directions.down = 0;
                   return false;
               case 38:
                   this.directions.up = 0;
                   return false;
               }
               return true;
           }

           Character.prototype.handleKeydown = function (keyCode) {

               switch (keyCode) {
               case 37:
                   this.directions.left = 1;
                   return false;
               case 39:
                   this.directions.right = 1;
                   return false;
               case 40:
                   this.directions.down = 1;
                   return false;
               case 38:
                   this.directions.up = 1;
                   return false;
               }
               return true;
           }


           return Character;
       }
);




