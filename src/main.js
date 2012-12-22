requirejs(["level/level"],
function (level) {
    var context = document.getElementById('game').getContext("2d")
    var startlevel = function startlevel() {
        level(context,
            {level: "1",
             time: 100,
             bricksDensity: 0.3,
             characterBaseSpeed: 3,
             bombs: 5,
             bombRange: 3,
             goombas: [0, 0],
             penaltyGoombas: 5,
             penaltyGoombaLevel: 1},
            {},
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
