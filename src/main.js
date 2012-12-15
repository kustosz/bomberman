requirejs(['level/Board', 'level/context'],
function (Board, context) {
    var b = new Board(context,
                      {bricksDensity: 0.3,
                       characterBaseSpeed: 1});
    setInterval(function () {b.update(); b.draw();}, 30);
});
