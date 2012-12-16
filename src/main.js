requirejs(['level/Board', 'level/context'],
function (Board, context) {
    var b = new Board(context,
                      {bricksDensity: 0.3,
                       characterBaseSpeed: 3,
                       bombs: 8,
                       bombRange: 3});
    document.onkeydown = function (e) {
        return b.character.handleKeydown(e.keyCode);
    }
    document.onkeyup = function (e) {
        return b.character.handleKeyup(e.keyCode);
    }
    setInterval(function () {
        b.update();
        b.draw();
    }, 20);
});
