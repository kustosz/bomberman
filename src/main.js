require.config({
    paths: {
        preloadjs: 'lib/preloadjs-0.3.0.min',
        jquery: 'lib/jquery-1.9.1.min'
    },
    shim: {
        'preloadjs': {
            exports: 'createjs.PreloadJS'
        }
    }
});
requirejs(["gameloop/gameloop", "loader/load", "menu/menu", "utils/resize",
           "instructions/instructions"],
function (gameloop, load, menu) {

    var context = document.getElementById('game').getContext("2d");
    BOMBERMAN = {};
    BOMBERMAN.assets = {};
    var mainmenu = function () {
        menu(game);
    }
    var game = function () {
        document.getElementById("game").style.display = "block";
        gameloop(context, mainmenu);
    }
    load(mainmenu);

});