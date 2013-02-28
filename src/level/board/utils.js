define("level/board/utils",
       [],
       function () {
           return {
               getDirX: function (speedX) {
                            return speedX > 0 ? "right" : "left";
                        },
               getDirY: function (speedY) {
                            return speedY > 0 ? "down" : "up";
                        }
           };
       });
