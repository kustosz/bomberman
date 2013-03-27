define("loader/Display",
       [],
       function () {
           return function () {
               var percent = document.getElementById("percent"),
                   bar = document.getElementById("bar"),
                   contain = percent.parentNode;
               percent.innerText = "Loading... 0%";
               bar.style.width = "0%";
               this.set = function (percentage) {
                   percent.innerText = "Loading... " + percentage + "%";
                   bar.style.width = percentage + "%";
               }
               this.hide = function () {
                   contain.style.display = "none";
               }
           } 
       }
);