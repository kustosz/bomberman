define("instructions/instructions",
       [],
       function () {
           var on = document.getElementById("instructions"),
               off = document.getElementById("close"),
               cover = document.getElementById("cover");
           on.addEventListener("click", function () {
               cover.style.display = "block";
           });
           off.addEventListener("click", function () {
               cover.style.display = "none";
           });
       }
);