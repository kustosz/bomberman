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
               this.updates = true;
           }

           Scoreboard.prototype.characterIcon = new Image();
           Scoreboard.prototype.characterIcon.src = settings.CHARACTER_ICON_SRC;

           Scoreboard.prototype.update = function () {
               this.width = this.context.canvas.width;
               if (!this.updates) {
                   return;
               }
               this.time -= 1;
               if (this.time <= 0) {
                   this.board.character.die();
                   return;
               }
           }

           Scoreboard.prototype.draw = function () {
               var levelStr = "LEVEL " + this.level;
               var timeStr;

               if (this.updates) {
                   timeStr = "TIME: " + this.time;
               } else {
                   timeStr = "PAUSED";
               }

               this.context.fillStyle = settings.BACKGROUND_COLOR;
               this.context.fillRect(0, 0, this.width, this.height);

               this.context.fillStyle = settings.FILL_STYLE;
               this.context.font = settings.FONT_STYLE;
               this.context.textAlign = settings.LEVEL_TEXT_ALIGN;
               this.context.textBaseline = settings.TEXT_BASELINE;
               this.context.fillText(levelStr, settings.LEVEL_TEXT_POSITION, this.height / 2);

               this.context.textAlign = settings.TIME_TEXT_ALIGN;
               this.context.fillText(timeStr, this.width - settings.TIME_TEXT_POSITION, this.height / 2);

               this.context.drawImage(this.characterIcon,
                                      this.width / 2 - settings.CHARACTER_ICON_WIDTH - settings.CHARACTER_ICON_RIGHT_MARGIN,
                                      this.height / 2 - settings.CHARACTER_ICON_HEIGHT / 2);

               this.context.textAlign = settings.LIVES_TEXT_ALIGN;
               this.context.fillText("\u00d7 " + this.lives, this.width / 2 + settings.LIVES_TEXT_POSITION, this.height / 2);

           }

           return Scoreboard;
       }
);
