define("utils/resize",
       ["level/board/settings"],
       function (settings) {
           var maxWidth = 1000,
               maxHeight = 600;
           var canvas = document.getElementById("game"),
               container = canvas.parentNode,
               loading = document.getElementById("loading");
           canvas.width = Math.min(maxWidth, window.innerWidth - 30);
           canvas.height = Math.min(maxHeight, window.innerHeight - 30);
           container.style.width = canvas.width + "px";
           container.style.height = canvas.height + "px";
           var setSize = function () {
               canvas.width = Math.min(maxWidth, window.innerWidth - 30);
               canvas.height = Math.min(maxHeight, window.innerHeight - 30);
               container.style.width = canvas.width + "px";
               container.style.height = canvas.height + "px";
           }
           window.addEventListener("resize", setSize);
       }
);
