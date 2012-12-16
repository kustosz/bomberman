define("level/Board",
       ["level/Bricks",
        "level/Concrete",
        "level/Empty",
        "level/Character",
        "level/Bomb",
        "level/Flames",
        "level/settings"],
       function (Bricks, Concrete, Empty, Character, Bomb, Flames, settings) {

           var getCol = function (x) {
               return Math.floor(x / settings.SQUARE_WIDTH);
           }

           var getRow = function (y) {
               return Math.floor(y / settings.SQUARE_HEIGHT);
           }

           var Board = function (context, options) {

               var i, j;
               var self = this;

               this.options = options;
               this.context = context;
               this.paperWidth = context.canvas.width;
               this.paperHeight = context.canvas.height;
               this.width = settings.SQUARE_WIDTH * settings.COLS;
               this.height = settings.SQUARE_HEIGHT * settings.ROWS;
               this.offsetX = 0;
               this.offsetY = 0;
               this.flames = [];
               this.bombs = [];
               this.goombas = [];
               this.blocks = [];
               this.character = new Character(this, options);

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

           }

           Board.prototype.update = function () {
               var i;
               for (i = 0; i < this.goombas.length; i += 1) {
                   this.goombas[i].update();
               }

               this.character.update();

               this.offsetX = this.character.x - this.paperWidth / 2;
               this.offsetX = Math.max(this.offsetX, 0);
               this.offsetX = Math.min(this.offsetX, this.width - this.paperWidth);

               this.offsetY = this.character.y - this.paperHeight / 2;
               this.offsetY = Math.max(this.offsetY, 0);
               this.offsetY = Math.min(this.offsetY, this.height - this.paperHeight);


           }

           Board.prototype.draw = function () {
               var i, j;
               var mincol = Math.floor(this.offsetX / settings.SQUARE_WIDTH),
                   minrow = Math.floor(this.offsetY / settings.SQUARE_HEIGHT),
                   maxcol = Math.floor((this.paperWidth + this.offsetX - 1) /
                                            settings.SQUARE_WIDTH),
                   maxrow = Math.floor((this.paperHeight + this.offsetY - 1) /
                                            settings.SQUARE_HEIGHT);
               for (i = minrow; i <= maxrow; i += 1) {
                   for (j = mincol; j <= maxcol; j += 1) {
                       this.blocks[i][j].draw();
                   }
               }
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
           }

           Board.prototype.detectCollisions = function (x, y, width, height, direction) {

               var centerCol = getCol(x + (width / 2)),
                   centerRow = getRow(y + (height / 2));
               var collide = false;
               var blocks = this.blocks;

               if (direction === "left" && getCol(x) < centerCol) {
                   if (blocks[getRow(y)][getCol(x)].blocking) {
                       collide = true;
                   }
                   if (blocks[getRow(y + height)][getCol(x)].blocking) {
                       collide = true;
                   }
               }
               if (direction === "right" && getCol(x + width) > centerCol) {
                   if (blocks[getRow(y)][getCol(x + width)].blocking) {
                       collide = true;
                   }
                   if (blocks[getRow(y + height)][getCol(x + width)].blocking) {
                       collide = true;
                   }
               }
               if (direction === "up" && getRow(y) < centerRow) {
                   if (blocks[getRow(y)][getCol(x)].blocking) {
                       collide = true;
                   }
                   if (blocks[getRow(y)][getCol(x + width)].blocking) {
                       collide = true;
                   }
               }
               if (direction === "down" && getRow(y + height) > centerRow) {
                   if (blocks[getRow(y + height)][getCol(x)].blocking) {
                       collide = true;
                   }
                   if (blocks[getRow(y + height)][getCol(x + width)].blocking) {
                       collide = true;
                   }
               }
               return collide;
           }

           Board.prototype.addBomb = function (row, col) {
               if (this.blocks[row][col].bomb === null &&
                       this.bombs.length < this.options.bombs) {
                   var bomb = new Bomb(this,
                                       col * settings.SQUARE_WIDTH,
                                       row * settings.SQUARE_HEIGHT);
                   this.blocks[row][col].bomb = bomb;
                   this.blocks[row][col].blocking = true;
                   this.bombs.push(bomb);
               }
           }

           Board.prototype.detonateBomb = function (bomb) {
               var row = getRow(bomb.y),
                   col = getCol(bomb.x);
               var i = 1;

               if (this.blocks[row][col].bomb === null ) {
                   return;      // bomb already detonated
               }

               this.blocks[row][col].bomb = null;
               this.blocks[row][col].blocking = false;
               this.addFlames(row, col);
               if(this.bombs.indexOf(bomb) !== -1) {
                   this.bombs.splice(this.bombs.indexOf(bomb), 1);
               }

               for (i = 1; i <= this.options.bombRange; i += 1) {
                   if (!this.detonateSquare(row + i, col)) {
                       break;
                   }
               }

               for (i = 1; i <= this.options.bombRange; i += 1) {
                   if (!this.detonateSquare(row - i, col)) {
                       break;
                   }
               }

               for (i = 1; i <= this.options.bombRange; i += 1) {
                   if (!this.detonateSquare(row, col - i)) {
                       break;
                   }
               }

               for (i = 1; i <= this.options.bombRange; i += 1) {
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
               if (this.blocks[row][col].flames === null) {
                   var flames = new Flames(this,
                                           col * settings.SQUARE_WIDTH,
                                           row * settings.SQUARE_HEIGHT);
                   this.blocks[row][col].flames = flames;
                   this.flames.push(flames);
               }
           }

           Board.prototype.deleteFlames = function (flames) {
               var row = getRow(flames.y),
                   col = getCol(flames.x);

               this.blocks[row][col].flames = null;
               this.blocks[row][col].passExplosion = true;
               if(this.flames.indexOf(flames) !== -1) {
                   this.flames.splice(this.flames.indexOf(flames), 1);
               }
           }

           Board.prototype.collideWithFlames = function (x, y, width, height) {
               var row,
                   col;
               var collide = false;

               row = getRow(y);
               col = getCol(x);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }
               col = getCol(x + width);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }
               row = getRow(y + height);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }
               col = getCol(x);
               if (this.blocks[row][col].flames !== null) {
                   collide = true;
               }

               return collide;
           }



           return Board;
       }
);





