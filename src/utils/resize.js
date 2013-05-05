define("utils/resize",
       ["level/board/settings"],
       function (settings) {
           var maxWidth = 1000,
               maxHeight = 600;
           var canvas = document.getElementById("game"),
               container = canvas.parentNode,
               loading = document.getElementById("loading");
           var setSize = function () {
               var width = Math.min(maxWidth, window.innerWidth - 30),
                   height = Math.min(maxHeight, window.innerHeight - 30),
                   margin = (window.innerHeight - height) / 2;
               canvas.width = width;
               canvas.height = height;
               container.style.width = width + "px";
               container.style.height = height + "px";
               container.style['margin-top'] = margin + "px";
           }
           setSize();
           window.addEventListener("resize", setSize);
       }
);
