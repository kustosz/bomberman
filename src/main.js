requirejs(["gameloop/gameloop", "mainscreen/mainscreen", "utils/resize"],
function (gameloop, mainscreen) {

    var context = document.getElementById('game').getContext("2d");
    var game = function () {
        gameloop(context, main);
    }
    var main = function () {
        mainscreen(context, game);
    }
    main();
});
