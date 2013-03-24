define("loader/load",
     ["loader/manifest", "preloadjs"],
     function (manifest) {
           return function (callback) {
               var queue = new createjs.LoadQueue();
               queue.addEventListener("complete", function () {
                   for (var i = 0, len = manifest.length; i < len; i += 1) {
                       BOMBERMAN.assets[manifest[i].id] = queue.getResult(manifest[i].id);
                   }
                   callback();
               });
               queue.loadManifest(manifest);
           }
     }
);
