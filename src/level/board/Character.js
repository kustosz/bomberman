define("level/board/Character",
       ["level/board/settings"],
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
               this.alive = true;
           }

           Character.prototype.drawingAlive = new Image();
           Character.prototype.drawingAlive.src = settings.CHARACTER_SRC;

           Character.prototype.drawingDead = new Image();
           Character.prototype.drawingDead.src = settings.CHARACTER_DEAD_SRC;

           Character.prototype.update = function () {

               if (!this.alive) {
                   return;
               }

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
                   }
               } else if (this.speedX < 0) {
                   collide = this.board.detectCollisions(this.x + this.speedX, this.y,
                                                         this.width, this.height,
                                                         "left");
                   if (!collide) {
                       this.x += this.speedX;
                   }
               }

               if (this.speedY > 0) {
                   collide = this.board.detectCollisions(this.x, this.y + this.speedY,
                                                         this.width, this.height,
                                                         "down");
                   if(!collide) {
                       this.y += this.speedY;
                   }
               } else if (this.speedY < 0) {
                   collide = this.board.detectCollisions(this.x, this.y + this.speedY,
                                                         this.width, this.height,
                                                         "up");
                   if(!collide) {
                       this.y += this.speedY;
                   }
               }

               if (this.board.collideWithFlames(this.x, this.y, this.width, this.height)) {
                   this.die();
               }

               this.row = Math.floor((this.y + this.height / 2) /
                               settings.SQUARE_HEIGHT);
               this.col = Math.floor((this.x + this.width / 2) /
                               settings.SQUARE_WIDTH);

           }

           Character.prototype.die = function () {
               this.alive = false;
               this.board.exitFailure();
           }

           Character.prototype.draw = function () {
               if (this.alive) {
                   this.board.context.drawImage(this.drawingAlive,
                                                this.x - this.board.offsetX,
                                                this.y - this.board.offsetY + settings.TOPMARGIN);
               } else {
                   this.board.context.drawImage(this.drawingDead,
                                                this.x - this.board.offsetX,
                                                this.y - this.board.offsetY + settings.TOPMARGIN);
               }
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
               case 32:
                   if (this.alive) {
                       this.board.addBomb(this.row, this.col);
                   }
                   return false;
               }
               return true;
           }


           return Character;
       }
);
