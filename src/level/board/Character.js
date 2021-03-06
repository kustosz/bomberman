define("level/board/Character",
       ["level/board/settings",
        "level/board/utils"],
       function (settings, utils) {

           var Character = function (board) {
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
               this.baseSpeed = board.skills.characterBaseSpeed;
               this.wallpass = board.skills.wallpass;
               this.bombpass = board.skills.bombpass;
               this.flamepass = board.skills.flamepass;
               this.alive = true;
               this.immortal = false;
               this.drawingAlive = BOMBERMAN.assets.characterIMG;
               this.drawingDead = BOMBERMAN.assets.character_deadIMG;
           }


           Character.prototype.update = function () {

               if (!this.alive) {
                   return;
               }

               var collide;

               this.speedX = this.directions.right - this.directions.left;
               this.speedY = this.directions.down - this.directions.up;
               this.speedX *= this.baseSpeed;
               this.speedY *= this.baseSpeed;

               if (this.speedX != 0) {
                   collide = this.board.detectCollisions(this.x + this.speedX, this.y,
                                                         this.width, this.height,
                                                         utils.getDirX(this.speedX),
                                                         this.bombpass, this.wallpass);
                   if (!collide) {
                       this.x += this.speedX;
                   }
               }

               if (this.speedY != 0) {
                   collide = this.board.detectCollisions(this.x, this.y + this.speedY,
                                                         this.width, this.height,
                                                         utils.getDirY(this.speedY),
                                                         this.bombpass, this.wallpass);
                   if(!collide) {
                       this.y += this.speedY;
                   }
               }

               if (this.board.collideWithFlames(this.x, this.y, this.width, this.height)) {
                   if (!this.flamepass) {
                       this.die();
                   }
               }

               this.row = Math.floor((this.y + this.height / 2) /
                               settings.SQUARE_HEIGHT);
               this.col = Math.floor((this.x + this.width / 2) /
                               settings.SQUARE_WIDTH);

           }

           Character.prototype.die = function () {
               if (this.immortal) {
                   return;
               }
               this.alive = false;
               this.board.exitFailure();
           }

           Character.prototype.draw = function () {
               var x = this.x * this.board.scale - this.board.offsetX,
                   y = this.y * this.board.scale - this.board.offsetY,
                   width = (this.width * this.board.scale),
                   height = (this.height * this.board.scale);
               if (this.alive) {
                   this.board.context.drawImage(this.drawingAlive,
                                                x, y + settings.TOPMARGIN,
                                                width, height);
               } else {
                   this.board.context.drawImage(this.drawingDead,
                                                x, y + settings.TOPMARGIN,
                                                width, height);
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
               case 90:
                   if (this.alive) {
                       this.board.addBomb(this.row, this.col);
                   }
                   return false;
               case 88:
                   if (this.alive) {
                       this.board.detonateFirstBomb();
                   }
                   return false;
               }
               return true;
           }


           return Character;
       }
);
