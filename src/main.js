requirejs(["gameloop/gameloop"],
function (gameloop) {
    var context = document.getElementById('game').getContext("2d")
    gameloop(context);
});
