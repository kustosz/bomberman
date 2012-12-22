define("level/scoreboard/Scoreboard",
       ["level/scoreboard/settings"],
       function (settings) {

           var Scoreboard = function (board, context, level, time, lives) {
               this.time = time;
               this.level = level;
               this.lives = lives;
               this.context = context;
               this.board = board;
               this.width = context.canvas.width;
               this.height = settings.HEIGHT;
           }

           Scoreboard.prototype.update = function () {
               this.time -= 1;
               if (this.time <= 0) {
                   this.board.character.die();
                   return;
               }
           }

           Scoreboard.prototype.draw = function () {
               this.context.fillStyle = settings.BACKGROUND_COLOR;
               this.context.fillRect(0, 0, this.width, this.height);

               this.context.fillStyle = settings.FILL_STYLE;
               this.context.font = settings.FONT_STYLE;
               this.context.textAlign = settings.LEVEL_TEXT_ALIGN;
               this.context.textBaseline = settings.TEXT_BASELINE;
               this.context.fillText("Level " + this.level, settings.LEVEL_TEXT_POSITION, this.height / 2);

               this.context.textAlign = settings.TIME_TEXT_ALIGN;
               this.context.fillText("time: " + this.time, this.width - settings.TIME_TEXT_POSITION, this.height / 2);
           }

           return Scoreboard;
       }
);
