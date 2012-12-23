requirejs(["level/level"],
function (level) {
    var context = document.getElementById('game').getContext("2d")
    var startlevel = function startlevel() {
        level(context,
            {level: "1",
             time: 300,
             bricksDensity: 0.3,
             goombas: [10, 10],
             powerup: "addBomb",
             penaltyGoombas: 5,
             penaltyGoombaLevel: 1},
            {lives: 3,
             bombs: 2,
             bombRange: 3,
             characterBaseSpeed: 3
            },
            function () {
                context.clearRect(0, 0, 1000, 560);
                startlevel();
            },
            function () {
                context.clearRect(0, 0, 1000, 560);
                startlevel();
            }
        );
    }
    startlevel();
});
