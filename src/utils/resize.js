define("utils/resize",
       ["level/board/settings"],
       function (settings) {
           var maxWidth = 1000,
               maxHeight = 600;
           var canvas = document.getElementById("game"),
               div = canvas.parentNode;
           canvas.width = Math.min(maxWidth, window.innerWidth - 30);
           canvas.height = Math.min(maxHeight, window.innerHeight - 30);
           div.style.width = canvas.width + "px";
           div.style.height = canvas.height + "px";
           window.onresize = function () {
               canvas.width = Math.min(maxWidth, window.innerWidth - 30);
               canvas.height = Math.min(maxHeight, window.innerHeight - 30);
               div.style.width = canvas.width + "px";
               div.style.height = canvas.height + "px";
           }
       }
);
