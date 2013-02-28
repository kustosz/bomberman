define("level/board/Board",
       ["utils/Timer",
        "level/board/Bricks",
        "level/board/Concrete",
        "level/board/Empty",
        "level/board/Character",
        "level/board/Bomb",
        "level/board/Flames",
        "level/board/Goomba",
        "level/board/Door",
        "level/board/Powerup",
        "level/board/settings"],
       function (Timer, Bricks, Concrete, Empty, Character, Bomb, Flames, Goomba, Door, Powerup, settings) {


           var Board = function (context, options, skills, onSuccess, onFailure) {

               var i, j;
               var t;
               var self = this;

               this.options = options;
               this.skills = skills;
               this.context = context;
               this.paperWidth = context.canvas.width;
               this.paperHeight = context.canvas.height - settings.TOPMARGIN;
               this.width = settings.SQUARE_WIDTH * settings.COLS;
               this.height = settings.SQUARE_HEIGHT * settings.ROWS;
               this.offsetX = 0;
               this.offsetY = 0;
               this.flames = [];
               this.bombs = [];
               this.goombas = [];
               this.blocks = [];
               this.timeouts = [];
               this.character = new Character(this);
               this.updates = true;
               this.draws = true;
               this.finished = false;
               this.scale = 1;

               this.onSuccess = function () {
                   onSuccess.apply(null, arguments);
               }

               this.onFailure = function () {
                   onFailure.apply(null, arguments);
               }

               for (i = 0; i < settings.ROWS; i += 1) {
                   this.blocks.push([]);
                   for (j = 0; j < settings.COLS; j += 1) {
                       if (i === 0 || j === 0 ||
                               i === settings.ROWS - 1 || j === settings.COLS - 1) {

                           this.blocks[i].push(new Concrete(this,
                                                            j * settings.SQUARE_WIDTH,
                                                            i * settings.SQUARE_HEIGHT));

                       } else if (i % 2 === 0 && j % 2 === 0) {
                           this.blocks[i].push(new Concrete(this,
                                                            j * settings.SQUARE_WIDTH,
                                                            i * settings.SQUARE_HEIGHT));

                       } else if (Math.random() < options.bricksDensity) {
                           this.blocks[i].push(new Bricks(this,
                                                          j * settings.SQUARE_WIDTH,
                                                          i * settings.SQUARE_HEIGHT));

                       } else {
                           this.blocks[i].push(new Empty(this,
                                                         j * settings.SQUARE_WIDTH,
                                                         i * settings.SQUARE_HEIGHT));
                       }
                   }
               }
               this.blocks[1][1] = new Empty(this,
                                             settings.SQUARE_WIDTH,
                                             settings.SQUARE_HEIGHT);
               this.blocks[1][2] = new Empty(this,
                                             2 * settings.SQUARE_WIDTH,
                                             settings.SQUARE_HEIGHT);
               this.blocks[2][1] = new Empty(this,
                                             settings.SQUARE_WIDTH,
                                             2 * settings.SQUARE_HEIGHT);

               var doorCoords = {
                   row: 0,
                   col: 0
               };

               while (this.blocks[doorCoords.row][doorCoords.col].type !== 'bricks') {
                   doorCoords.row = Math.floor(Math.random() * (settings.ROWS - 4)) + 4;
                   doorCoords.col = Math.floor(Math.random() * (settings.COLS - 4)) + 4;
               }

               this.door = new Door(this, doorCoords.row, doorCoords.col);

               var powCoords = {
                   row: 0,
                   col: 0
               };

               while (this.blocks[powCoords.row][powCoords.col].type !== 'bricks' ||
                        (powCoords.row === doorCoords.row && powCoords.col === doorCoords.col)) {
                   powCoords.row = Math.floor(Math.random() * (settings.ROWS - 4)) + 4;
                   powCoords.col = Math.floor(Math.random() * (settings.COLS - 4)) + 4;
               }

               this.powerup = new Powerup(this, powCoords.row, powCoords.col, options.powerup);

               var randomCoords = function () {
                   var col = 0,
                       row = 0;

                   while (self.blocks[row][col].blocking) {
                       row = Math.floor(Math.random() * (settings.ROWS - 4)) + 4;
                       col = Math.floor(Math.random() * (settings.COLS - 4)) + 4;
                   }

                   return {
                       row: row,
                       col: col
                   }
               }

               for (i = 0; i < options.goombas.length; i += 1) {
                   for (j = 0; j < options.goombas[i]; j += 1) {
                       t = randomCoords();
                       this.goombas.push(new Goomba(this, t.row, t.col, i));
                   }
               }

           }

           var getCol = function (x) {
               return Math.floor(x / settings.SQUARE_WIDTH);
           }

           var getRow = function (y) {
               return Math.floor(y / settings.SQUARE_HEIGHT);
           }

           Board.prototype.getCol = getCol;
           Board.prototype.getRow = getRow;

           Board.prototype.update = function () {

               this.paperWidth = this.context.canvas.width;
               this.paperHeight = this.context.canvas.height - settings.TOPMARGIN;
               this.scale = Math.min(this.paperWidth / settings.BASE_PAPER_WIDTH,
                                     this.paperHeight / settings.BASE_PAPER_HEIGHT);
               if (this.scale * this.width < this.paperWidth) {
                   this.scale = this.paperWidth / this.width;
               }
               if (this.scale * this.height < this.paperHeight) {
                   this.scale = this.paperHeight / this.height;
               }

               if (!this.updates) {
                   return;
               }

               var i;

               if (this.checkSuccess()) {
                   this.exitSuccess();
               }

               this.getPowerup();
               this.openDoor();

               this.character.update();
               for (i = 0; i < this.goombas.length; i += 1) {
                   this.goombas[i].update();
                   if (this.goombas[i].collideWithCharacter(this.character.x,
                                                            this.character.y,
                                                            this.character.width,
                                                            this.character.height)) {
                       this.character.die();
                   }
               }

               this.offsetX = this.character.x * this.scale - this.paperWidth / 2;
               this.offsetX = Math.max(this.offsetX, 0);
               this.offsetX = Math.min(this.offsetX, this.width * this.scale - this.paperWidth);

               this.offsetY = this.character.y * this.scale - this.paperHeight / 2;
               this.offsetY = Math.max(this.offsetY, 0);
               this.offsetY = Math.min(this.offsetY, this.height * this.scale - this.paperHeight);


           }

           Board.prototype.draw = function () {
               if (!this.draws) {
                   return;
               }
               var i, j;
               var mincol = Math.floor(this.offsetX / (settings.SQUARE_WIDTH * this.scale)),
                   minrow = Math.floor(this.offsetY / (settings.SQUARE_HEIGHT * this.scale)),
                   maxcol = Math.floor((this.paperWidth + this.offsetX - 1) /
                                            (settings.SQUARE_WIDTH * this.scale)),
                   maxrow = Math.floor((this.paperHeight + this.offsetY - 1) /
                                            (settings.SQUARE_HEIGHT * this.scale));

                   mincol = Math.max(mincol, 0);
                   minrow = Math.max(minrow, 0);
                   maxcol = Math.min(maxcol, settings.COLS - 1);
                   maxrow = Math.min(maxrow, settings.ROWS - 1);

               for (i = minrow; i <= maxrow; i += 1) {
                   for (j = mincol; j <= maxcol; j += 1) {
                       this.blocks[i][j].draw();
                   }
               }

               this.door.draw();
               this.powerup.draw();

               for (i = 0; i < this.bombs.length; i += 1) {
                   this.bombs[i].draw();
               }

               for (i = 0; i < this.flames.length; i += 1) {
                   this.flames[i].draw();
               }

               for(i = 0; i < this.goombas.length; i += 1) {
                   this.goombas[i].draw();
               }

               this.character.draw();

               this.context.fillStyle = "#000";
               this.context.fillRect(0, 0, this.width, settings.TOPMARGIN);
           }

           Board.prototype.detectCollisions = function (x, y, width, height, direction, bombpass, wallpass) {

               var centerCol = getCol(x + (width / 2)),
                   centerRow = getRow(y + (height / 2));
               var collide = false;
               var blocks = this.blocks;

               var checkBlocking = function (x, y) {
                   var block = blocks[getRow(y)][getCol(x)],
                       blocking = false;
                   if (block.type === "concrete") {
                       return true;
                   } else if (!wallpass && block.type === "bricks") {
                       return true;
                   } else if (!bombpass && block.bomb !== null) {
                       return true;
                   }
                   return false;
               }

               if (direction === "left" && getCol(x) < centerCol) {
                   return checkBlocking(x, y) || checkBlocking(x, y + height);
               } else if (direction === "right" && getCol(x + width) > centerCol) {
                   return checkBlocking(x + width, y) || checkBlocking(x + width, y + height);
               } else if (direction === "up" && getRow(y) < centerRow) {
                   return checkBlocking(x, y) || checkBlocking(x + width, y);
               } else if (direction === "down" && getRow(y + height) > centerRow) {
                   return checkBlocking(x, y + height) || checkBlocking(x + width, y + height);
               }
               return false;
           }

           Board.prototype.addBomb = function (row, col) {
               if (this.blocks[row][col].bomb === null &&
                       this.bombs.length < this.skills.bombs) {
                   var bomb = new Bomb(this,
                                       col * settings.SQUARE_WIDTH,
                                       row * settings.SQUARE_HEIGHT);
                   this.blocks[row][col].bomb = bomb;
                   this.bombs.push(bomb);
               }
           }

           Board.prototype.detonateBomb = function (bomb) {
               var row = getRow(bomb.y),
                   col = getCol(bomb.x);
               var i = 1;

               if (this.blocks[row][col].bomb === null ) {
                   return;
               }

               this.blocks[row][col].bomb = null;
               this.detonateSquare(row, col);
               if(this.bombs.indexOf(bomb) !== -1) {
                   this.bombs.splice(this.bombs.indexOf(bomb), 1);
               }

               for (i = 1; i <= this.skills.bombRange; i += 1) {
                   if (!this.detonateSquare(row + i, col)) {
                       break;
                   }
               }

               for (i = 1; i <= this.skills.bombRange; i += 1) {
                   if (!this.detonateSquare(row - i, col)) {
                       break;
                   }
               }

               for (i = 1; i <= this.skills.bombRange; i += 1) {
                   if (!this.detonateSquare(row, col - i)) {
                       break;
                   }
               }

               for (i = 1; i <= this.skills.bombRange; i += 1) {
                   if (!this.detonateSquare(row, col + i)) {
                       break;
                   }
               }
           }

           Board.prototype.detonateSquare = function (row, col) {

               if (this.blocks[row][col].bomb !== null) {
                   this.detonateBomb(this.blocks[row][col].bomb);
               }

               if (this.blocks[row][col].type === "empty") {
                   this.addFlames(row, col);
               } else if (this.blocks[row][col].type === "bricks") {
                   this.blocks[row][col] = new Empty(this,
                                                     this.blocks[row][col].x,
                                                     this.blocks[row][col].y);
                   this.blocks[row][col].passExplosion = false;
                   this.addFlames(row, col);
               }

               return this.blocks[row][col].passExplosion;
           }


           Board.prototype.addFlames = function (row, col) {
               var flames = new Flames(this,
                                       col * settings.SQUARE_WIDTH,
                                       row * settings.SQUARE_HEIGHT);
               var self = this;
               this.blocks[row][col].flames = flames;
               this.flames.push(flames);
               if (row === this.door.row && col === this.door.col
                       && this.blocks[this.door.row][this.door.col].passExplosion) {
                   new Timer(function () {
                       self.addPenaltyGoombas(self.door.row, self.door.col);
                   }, settings.FLAMES_TIMEOUT, this.timeouts);
               }
               if (row === this.powerup.row && col === this.powerup.col &&
                       !this.powerup.used && this.blocks[this.powerup.row][this.powerup.col].passExplosion) {
                   new Timer(function () {
                       self.addPenaltyGoombas(self.powerup.row, self.powerup.col);
                   }, settings.FLAMES_TIMEOUT, this.timeouts);
               }
           }

           Board.prototype.addPenaltyGoombas = function (row, col) {
               var i;
               for (i = 0; i < this.options.penaltyGoombas; i += 1) {
                   this.goombas.push(new Goomba(this, row, col,
                                                this.options.penaltyGoombaLevel));
               }
           }

           Board.prototype.deleteFlames = function (flames) {
               var row = getRow(flames.y),
                   col = getCol(flames.x);

               if (this.blocks[row][col].flames === flames) {
                   this.blocks[row][col].flames = null;
                   this.blocks[row][col].passExplosion = true;
               }

               if (this.flames.indexOf(flames) !== -1) {
                   this.flames.splice(this.flames.indexOf(flames), 1);
               }
           }

           Board.prototype.collideWithFlames = function (x, y, width, height) {
               var row,
                   col;
               var collide = false;

               row = getRow(y + 8);
               col = getCol(x + 8);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }
               col = getCol(x + width - 8);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }
               row = getRow(y + height - 8);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }
               col = getCol(x + 8);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }

               return collide;
           }

           Board.prototype.deleteGoomba = function (goomba) {
               if (this.goombas.indexOf(goomba) !== -1) {
                   this.goombas.splice(this.goombas.indexOf(goomba), 1);
               }
           }

           Board.prototype.checkSuccess = function () {
               var success = true,
                   centerRow = getRow(this.character.y + this.character.height / 2),
                   centerCol = getCol(this.character.x + this.character.width / 2);
               if (this.goombas.length > 0) {
                   success = false;
               }
               if (centerRow !== this.door.row || centerCol !== this.door.col) {
                   success = false;
               }
               if (this.blocks[this.door.row][this.door.col].type !== "empty") {
                   success = false;
               }
               return success;
           }

           Board.prototype.exitSuccess = function () {
               if (this.finished) {
                   return;
               }
               this.finished = true;
               var self = this;
               this.updates = false;
               new Timer(function () {
                   self.onSuccess(self.skills);
               }, settings.SUCCESS_TIMEOUT, this.timeouts);
           }

           Board.prototype.exitFailure = function () {
               if (this.finished) {
                   return;
               }
               this.finished = true;
               var self = this;
               new Timer(function () {
                   self.onFailure();
               }, settings.GAMEOVER_TIMEOUT, this.timeouts);
           }

           Board.prototype.getPowerup = function () {
               if (this.powerup.used ||
                       this.blocks[this.powerup.row][this.powerup.col].type !== "empty") {
                   return;
               }

               var centerRow = getRow(this.character.y + this.character.height / 2),
                   centerCol = getCol(this.character.x + this.character.width / 2);

               if (centerRow === this.powerup.row && centerCol === this.powerup.col) {
                   var self = this;
                   this.powerup.used = true;
                   if (this.powerup.type === "addBomb") {
                       this.skills.bombs += 1;
                   } else if (this.powerup.type === "increaseRange") {
                       this.skills.bombRange += 1;
                   } else if (this.powerup.type === "speed") {
                       this.skills.characterBaseSpeed += 1;
                       this.character.baseSpeed += 1;
                   } else if (this.powerup.type === "detonator") {
                       this.setDetonator();
                       this.skills.detonator = true;
                   } else if (this.powerup.type === "bombpass") {
                       this.skills.bombpass = true;
                       this.character.bombpass = true;
                   } else if (this.powerup.type === "wallpass") {
                       this.skills.wallpass = true;
                       this.character.wallpass = true;
                   } else if (this.powerup.type === "flamepass") {
                       this.skills.flamepass = true;
                       this.character.flamepass = true;
                   } else if (this.powerup.type === "mystery") {
                       this.character.immortal = true;
                       new Timer(function () {
                           self.character.immortal = false;
                       },
                       Math.random() * settings.MYSTERY_MAX_TIME + settings.MYSTERY_MIN_TIME,
                       self.timeouts);
                   }

               }
           }

           Board.prototype.openDoor = function () {
               if (this.goombas.length === 0) {
                   this.door.opened = true;
               } else {
                   this.door.opened = false;
               }
           }

           Board.prototype.setDetonator = function () {
               var i, len;
               for (i = 0, len = this.bombs.length; i < len; i += 1) {
                   if (this.bombs[i].hasOwnProperty(timeout)) {
                       this.bombs[i].timeout.stop();
                   }
               }
           }

           Board.prototype.detonateFirstBomb = function () {
               if (!this.skills.detonator) {
                   return;
               }
               if (this.bombs.length > 0) {
                   this.detonateBomb(this.bombs[0]);
               }
           }

           Board.prototype.pause = function () {
               var i, len;
               for (i = 0, len = this.timeouts.length; i < len; i += 1) {
                   this.timeouts[i].pause();
               }
               this.draws = false;
               this.updates = false;
               this.character.alive = false;
           }

           Board.prototype.resume = function () {
               var i, len;
               for (i = 0, len = this.timeouts.length; i < len; i += 1) {
                   this.timeouts[i].resume();
               }
               this.character.alive = true;
               this.draws = true;
               this.updates = true;
           }




           return Board;
       }
);
