require.config({
    paths: {
        preloadjs: 'lib/preloadjs-0.3.0.min'
    },
    shim: {
        'preloadjs': {
            exports: 'createjs.PreloadJS'
        }
    }
});
requirejs(["gameloop/gameloop", "loader/load", "utils/resize"],
function (gameloop, load) {

    var context = document.getElementById('game').getContext("2d");
    BOMBERMAN = {};
    BOMBERMAN.assets = {};
    var game = function () {
        gameloop(context, game);
    }
    load(game);

});
