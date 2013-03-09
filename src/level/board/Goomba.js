define("level/board/Goomba",
       ["utils/Timer",
        "level/board/utils",
        "level/board/settings"],
       function (Timer, utils, settings) {

           var i;

           var Goomba = function (board, row, col, level) {
               this.board = board;
               this.x = col * settings.SQUARE_WIDTH +
                   (settings.SQUARE_WIDTH - settings.GOOMBA_WIDTH) / 2,
               this.y = row * settings.SQUARE_HEIGHT +
                   (settings.SQUARE_HEIGHT - settings.GOOMBA_HEIGHT) / 2
               this.level = level;
               this.width = settings.GOOMBA_WIDTH;
               this.height = settings.GOOMBA_HEIGHT;
               this.baseSpeed = settings.GOOMBAS[level].BASE_SPEED;
               this.wallpass = settings.GOOMBAS[level].WALLPASS;
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
               var x = this.x * this.board.scale - this.board.offsetX,
                   y = this.y * this.board.scale - this.board.offsetY,
                   width = (this.width * this.board.scale),
                   height = (this.height * this.board.scale);
               if (this.alive) {
                   this.board.context.drawImage(this.drawingsAlive[this.level],
                                                x, y + settings.TOPMARGIN,
                                                width, height);
               } else {
                   this.board.context.drawImage(this.drawingsDead[this.level],
                                                x, y + settings.TOPMARGIN,
                                                width, height);
               }
           }

           Goomba.prototype.die = function () {
               var self = this;
               this.alive = false;
               new Timer(function () {
                   self.board.deleteGoomba(self);
               }, settings.GOOMBA_TIMEOUT, this.board.timeouts);
           }

           Goomba.prototype.getDir = function (speed) {
               return Math.floor(speed / this.baseSpeed);
           }

           Goomba.prototype.getDirStr = function () {
               if (this.speedX > 0) {
                   return "right";
               } else if (this.speedX < 0) {
                   return "left";
               } else if (this.speedY > 0) {
                   return "down";
               } else if (this.speedY < 0) {
                   return "up";
               }
           }

           Goomba.prototype.checkBlocking = function (row, col) {
               return this.board.blocks[row][col].type === "concrete" ||
                   this.board.blocks[row][col].bomb !== null ||
                   (!this.wallpass && this.board.blocks[row][col].type === "bricks");
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

               col = utils.getCol(this.x) + this.getDir(newX);
               row = utils.getRow(this.y) + this.getDir(newY);

               if (collide || !this.checkBlocking(row, col)) {
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

               col = utils.getCol(this.x) + this.getDir(newX);
               row = utils.getRow(this.y) + this.getDir(newY);

               if (collide || !this.checkBlocking(row, col)) {
                   this.speedX = newX;
                   this.speedY = newY;
               }
           }

           Goomba.prototype.turnBack = function (collide) {
               var row, col;
               var newX, newY;

               newY = -1 * this.speedY;
               newX = -1 * this.speedX;

               col = utils.getCol(this.x) + this.getDir(newX);
               row = utils.getRow(this.y) + this.getDir(newY);


               if (collide || !this.checkBlocking(row, col)) {
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
                   if (Math.random() < 1 / 2) {
                       this.turnLeft();
                   } else {
                       this.turnRight();
                   }
               } else if (this.checkCenterPosition() &&
                       Math.random() < settings.GOOMBAS[this.level].PR_TURN_BACK) {
                   this.turnBack();
               }

               if (!this.board.detectCollisions(this.x + this.speedX, this.y + this.speedY,
                                                this.width, this.height,
                                                this.getDirStr(), false, this.wallpass)) {
                   this.x += this.speedX;
                   this.y += this.speedY;
               } else {
                   this.turnBack(true);
               }
           }

           Goomba.prototype.collideWithCharacter = function (x, y, width, height) {
               var left, right, top, bottom;
               if (!this.alive) {
                   return false;
               }
               top = Math.max(this.y, y);
               bottom = Math.min(this.y + this.height, y + height);
               left = Math.max(this.x, x);
               right = Math.min(this.x + this.width, x + width);
               return left <= right - 10 && top <= bottom - 10;
           }


           return Goomba;
       }
);
