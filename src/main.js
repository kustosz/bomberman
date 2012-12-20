requirejs(['level/Board', 'level/context'],
function (Board, context) {
    var int;
    var b = new Board(context,
                      {bricksDensity: 0.3,
                       characterBaseSpeed: 3,
                       bombs: 5,
                       bombRange: 3,
                       goombas: [2, 0]},
                       function () {
                           context.clearRect(0, 0, 1000, 560);
                           clearInterval(int);
                       },
                       function () {
                           context.clearRect(0, 0, 1000, 560);
                           clearInterval(int);
                       });
    document.onkeydown = function (e) {
        return b.character.handleKeydown(e.keyCode);
    }
    document.onkeyup = function (e) {
        return b.character.handleKeyup(e.keyCode);
    }
    int = setInterval(function () {
        b.update();
        b.draw();
    }, 20);
});
