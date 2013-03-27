define("loader/load",
       ["loader/manifest", "loader/Display", "preloadjs"],
       function (manifest, Display) {
             return function (callback) {
                 var queue = new createjs.LoadQueue(),
                     display = new Display();
                 queue.addEventListener("complete", function () {
                     for (var i = 0, len = manifest.length; i < len; i += 1) {
                         BOMBERMAN.assets[manifest[i].id] = queue.getResult(manifest[i].id);
                     }
                     display.hide();
                     callback();
                 });
                 queue.addEventListener("progress", function (e) {
                     display.set(Math.floor(e.loaded*100));
                 });
                 queue.loadManifest(manifest);
             }
       }
);
