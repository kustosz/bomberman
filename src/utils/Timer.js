define("utils/Timer",
       [],
       function () {
           return function (callback, timeout, stack) {
               var timerId, start;
               var remaining = timeout;
               var self = this;

               stack.push(this);
               this.pause = function () {
                   window.clearTimeout(timerId);
                   remaining -= new Date() - start;
               }

               this.resume = function () {
                   start = new Date();
                   timerId = setTimeout(function () {
                       if (stack.indexOf(self) !== -1) {
                           stack.splice(stack.indexOf(self), 1);
                       }
                       callback();
                   }, remaining);
               }

               this.resume();
           }
       }
);



