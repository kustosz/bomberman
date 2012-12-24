define("gameloop/gameloop",
       ["gameloop/levels",
        "level/level",
        "level/blackboard/blackboard",
        "gameloop/settings"],
       function (levels, level, blackboard, settings) {

           return function (context) {
               var levelNum = 0;
               var skills = {
                   lives: 3,
                   bombs: 1,
                   bombRange: 1,
                   characterBaseSpeed: 3
               };
               var startLevel = function () {
                   level(context, levels[levelNum], skills, passed, failed);
               }
               var passed = function (newSkills) {
                   skills = newSkills;
                   skills.lives += 1;
                   levelNum += 1;
                   if (levelNum >= levels.length) {
                       levelNum = 0;
                       skills = {
                           lives: 3,
                           bombs: 1,
                           bombRange: 1,
                           characterBaseSpeed: 3
                       };
                       blackboard(context, settings.GREETINGS_STRING, startLevel, settings.BLACKBOARD_TIMEOUT);
                   } else {
                       startLevel();
                   }
               }
               var failed = function () {
                   skills.lives -= 1;
                   if (skills.lives < 0) {
                       levelNum = 0;
                       skills = {
                           lives: 3,
                           bombs: 1,
                           bombRange: 1,
                           characterBaseSpeed: 3
                       };
                       blackboard(context, settings.GAMEOVER_STRING, startLevel, settings.BLACKBOARD_TIMEOUT);
                   } else {
                       startLevel();
                   }
               }

               startLevel();
           }
       }
);



