define("level/board/utils",
       ["level/board/settings"],
       function (settings) {
           return {
               getDirX: function (speedX) {
                            return speedX > 0 ? "right" : "left";
                        },
               getDirY: function (speedY) {
                            return speedY > 0 ? "down" : "up";
                        },
               getCol:  function (x) {
                            return Math.floor(x / settings.SQUARE_WIDTH);
                        },
               getRow:  function (x) {
                            return Math.floor(x / settings.SQUARE_HEIGHT);
                        }
           };
       });
