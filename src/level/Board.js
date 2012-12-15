define("level/Board",
       ["level/Bricks",
        "level/Concrete",
        "level/Empty",
        "level/Character",
        "level/settings"],
       function (Bricks, Concrete, Empty, Character, settings) {

           var Board = function (context, options) {

               var i, j;

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
                       if (i === 0 || j === 0) {
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
           }

           Board.prototype.draw = function () {
               var i, j;
               for (i = 0; i < this.blocks.length; i += 1) {
                   for (j = 0; j < this.blocks[i].length; j += 1) {
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

           return Board;
       }
);





