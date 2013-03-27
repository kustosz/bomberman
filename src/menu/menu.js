define("menu/menu",
       [],
       function () {
           return function (callback) {
               var container = document.getElementById("container"),
                   menu = document.getElementById("menu"),
                   start = document.getElementById("start"),
                   canvas = document.getElementById("game");
               container.style.display = "block";
               menu.style.display = "block";
               canvas.style.display = "none";
               start.onclick = function () {
                   menu.style.display = "none";
                   callback();
               };
           }
       }
);