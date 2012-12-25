requirejs(["gameloop/gameloop", "utils/resize"],
function (gameloop) {

    var context = document.getElementById('game').getContext("2d")
    gameloop(context);
});
