define("level/level",
       ["level/board/Board",
        "level/blackboard/blackboard",
        "level/scoreboard/Scoreboard",
        "level/settings"],
       function (Board, blackboard, Scoreboard, settings) {

           return function (context, options, lives, onPass, onGameover) {
               console.log(Scoreboard);
               var intBoard, intScoreboard;
               var oldKeydown = document.onkeydown,
                   oldKeyup = document.onkeyup;

               var gameover = function () {
                   clearInterval(intBoard);
                   clearInterval(intScoreboard);
                   document.onkeydown = oldKeydown;
                   document.onkeyup = oldKeyup;
                   blackboard(context, "Game Over!", function () {
                       onGameover();
                   }, settings.BLACKBOARD_TIMEOUT);
               }

               var success = function () {
                   clearInterval(intBoard);
                   clearInterval(intScoreboard);
                   document.onkeydown = oldKeydown;
                   document.onkeyup = oldKeyup;
                   blackboard(context, "Congratulations!", function () {
                       onPass();
                   }, settings.BLACKBOARD_TIMEOUT);
               }

               var initBoard = function () {
                   var board = new Board(context, options, success, gameover);
                   var scoreboard = new Scoreboard(board, context, options.level, options.time, lives);
                   document.onkeydown = function (e) {
                       return board.character.handleKeydown(e.keyCode);
                   }
                   document.onkeyup = function (e) {
                       return board.character.handleKeyup(e.keyCode);
                   }
                   intBoard = setInterval(function () {
                       board.update();
                       board.draw();
                       scoreboard.draw();
                   }, settings.FRAME_INTERVAL);
                   intScoreboard = setInterval(function () {
                       scoreboard.update();
                   }, settings.SCOREBOARD_INTERVAL);
               }

               blackboard(context, "Level " + options.level, initBoard, settings.BLACKBOARD_TIMEOUT);
           }
       }
);







