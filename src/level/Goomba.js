define("level/Goomba",
       ["level/settings"],
       function (settings) {

           var i;

           var Goomba = function (board, x, y, level) {
               this.board = board;
               this.x = x;
               this.y = y;
               this.level = level;
               this.width = settings.GOOMBA_WIDTH;
               this.height = settings.GOOMBA_HEIGHT;
               this.baseSpeed = settings.GOOMBAS[level].BASE_SPEED;
               this.speedX = this.baseSpeed;
               this.speedY = 0;
               this.alive = true;
           }

           Goomba.prototype.drawingsAlive = [];
           Goomba.prototype.drawingsDead = [];

           for (i = 0; i < settings.GOOMBAS.length; i += 1) {
               Goomba.prototype.drawingsAlive.push(new Image());
               Goomba.prototype.drawingsAlive[i].src = settings.GOOMBAS[i].SRC;
               Goomba.prototype.drawingsDead.push(new Image());
               Goomba.prototype.drawingsDead[i].src = settings.GOOMBAS[i].DEAD_SRC;
           }

           Goomba.prototype.draw = function () {
               if (this.alive) {
                   this.board.context.drawImage(this.drawingsAlive[this.level],
                                                this.x - this.board.offsetX,
                                                this.y - this.board.offsetY);
               } else {
                   this.board.context.drawImage(this.drawingsDead[this.level],
                                                this.x - this.board.offsetX,
                                                this.y - this.board.offsetY);
               }
           }

           Goomba.prototype.die = function () {
               var self = this;
               this.alive = false;
               setTimeout(function () {
                   self.board.deleteGoomba(self);
               }, settings.GOOMBA_TIMEOUT);
           }

           Goomba.prototype.getDir = function (speed) {
               return Math.floor(speed / this.baseSpeed);
           }

           Goomba.prototype.turnLeft = function (collide) {
               var row, col;
               var newX, newY;

               if (this.speedY !== 0) {
                   newX = this.speedY;
                   newY = 0;
               } else {
                   newY = -1 * this.speedX;
                   newX = 0;
               }

               col = this.board.getCol(this.x) + this.getDir(newX);
               row = this.board.getRow(this.y) + this.getDir(newY);

               if (collide === true || this.board.blocks[row][col].blocking === false) {
                   this.speedX = newX;
                   this.speedY = newY;
               }
           }


           Goomba.prototype.turnRight = function (collide) {
               var row, col;
               var newX, newY;

               if (this.speedX !== 0) {
                   newY = this.speedX;
                   newX = 0;
               } else {
                   newX = -1 * this.speedY;
                   newY = 0;
               }

               col = this.board.getCol(this.x) + this.getDir(newX);
               row = this.board.getRow(this.y) + this.getDir(newY);

               if (collide === true || this.board.blocks[row][col].blocking === false) {
                   this.speedX = newX;
                   this.speedY = newY;
               }
           }

           Goomba.prototype.turnBack = function (collide) {
               var row, col;
               var newX, newY;

               newY = -1 * this.speedY;
               newX = -1 * this.speedX;

               col = this.board.getCol(this.x) + this.getDir(newX);
               row = this.board.getRow(this.y) + this.getDir(newY);


               if (collide === true || this.board.blocks[row][col].blocking === false) {
                   this.speedX = newX;
                   this.speedY = newY;
               }
           }

           Goomba.prototype.checkCenterPosition = function () {
               var centerX = (this.x + this.width / 2) % settings.SQUARE_WIDTH,
                   centerY = (this.y + this.height / 2) % settings.SQUARE_HEIGHT,
                   sqCenterX = settings.SQUARE_WIDTH / 2,
                   sqCenterY = settings.SQUARE_HEIGHT / 2;

               var inCenter = true;

               if (centerX < sqCenterX - this.baseSpeed / 2) {
                   inCenter = false;
               }
               if (centerX > sqCenterX + this.baseSpeed / 2) {
                   inCenter = false;
               }
               if (centerY < sqCenterY - this.baseSpeed / 2) {
                   inCenter = false;
               }
               if (centerY > sqCenterY + this.baseSpeed / 2) {
                   inCenter = false;
               }
               return inCenter;
           }

           Goomba.prototype.update = function () {
               if (this.alive === false) {
                   return;
               }

               if (this.board.collideWithFlames(this.x, this.y,
                                                this.width, this.height)) {
                   this.die();
               }

               if (this.checkCenterPosition() &&
                       Math.random() < settings.GOOMBAS[this.level].PR_TURN) {
                   if (Math.random < 1 / 2) {
                       this.turnLeft();
                   } else {
                       this.turnRight();
                   }
               }
               if (this.speedX > 0) {
                   if (!this.board.detectCollisions(this.x + this.speedX, this.y,
                                                    this.width, this.height,
                                                    "right")) {
                       this.x += this.speedX;
                   } else {
                       this.turnBack(true);
                   }
               } else  if (this.speedX < 0) {
                   if (!this.board.detectCollisions(this.x + this.speedX, this.y,
                                                    this.width, this.height,
                                                    "left")) {
                       this.x += this.speedX;
                   } else {
                       this.turnBack(true);
                   }
               } else if (this.speedY > 0) {
                   if (!this.board.detectCollisions(this.x, this.y + this.speedY,
                                                    this.width, this.height,
                                                    "down")) {
                       this.y += this.speedY;
                   } else {
                       this.turnBack(true);
                   }
               } else if (this.speedY < 0) {
                   if (!this.board.detectCollisions(this.x, this.y + this.speedY,
                                                    this.width, this.height,
                                                    "up")) {
                       this.y += this.speedY;
                   } else {
                       this.turnBack(true);
                   }
               }
           }

           Goomba.prototype.collideWithCharacter = function (x, y, width, height) {
               var left, right, top, bottom;
               top = Math.max(this.y, y);
               bottom = Math.min(this.y + this.height, y + height);
               left = Math.max(this.x, x);
               right = Math.min(this.x + this.width, x + width);
               return left <= right - 5 && top <= bottom - 5;
           }


           return Goomba;
       }
);





