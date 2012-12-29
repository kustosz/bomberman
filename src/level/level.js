define("level/level",
       ["level/board/Board",
        "level/blackboard/blackboard",
        "level/scoreboard/Scoreboard",
        "level/settings"],
       function (Board, blackboard, Scoreboard, settings) {

           return function (context, options, skills, onPass, onGameover) {
               var intBoard, intScoreboard;

               var gameover = function () {
                   clearInterval(intBoard);
                   clearInterval(intScoreboard);
                   onGameover();
               }

               var success = function (newSkills) {
                   clearInterval(intBoard);
                   clearInterval(intScoreboard);
                   onPass(newSkills);
               }

               var initBoard = function () {
                   var skillsCopy = {};
                   var i;
                   for (i in skills) {
                       if (skills.hasOwnProperty(i)) {
                           skillsCopy[i] = skills[i];
                       }
                   }

                   var board = new Board(context, options, skillsCopy, success, gameover);
                   var scoreboard = new Scoreboard(board, context, options.level, options.time, skills.lives);

                   var paused = false;
                   var pause = function () {
                       board.pause();
                       scoreboard.updates = !scoreboard.updates;
                       paused = true;
                   }

                   var resume = function () {
                       board.resume();
                       scoreboard.updates = !scoreboard.updates;
                       paused = false;
                   }

                   var togglePaused = function () {
                       if (paused) {
                           resume();
                       } else {
                           pause();
                       }
                   }

                   document.onkeydown = function (e) {
                       if (e.keyCode === 80) {
                           togglePaused();
                           return false;
                       } else {
                           return board.character.handleKeydown(e.keyCode);
                       }
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

               blackboard(context, "Stage " + options.level, initBoard, settings.BLACKBOARD_TIMEOUT);
           }
       }
);
