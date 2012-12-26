define("utils/Timer",
       [],
       function () {
           return function (callback, timeout, stack, bomb) {
               var timerId, start;
               var remaining = timeout;
               var self = this;
               this.bomb = bomb;

               stack.push(this);
               this.pause = function () {
                   clearTimeout(timerId);
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

               this.stop = function () {
                   clearTimeout(timerId);
                   if (stack.indexOf(self) !== -1 ) {
                       stack.splice(stack.indexOf(self), 1);
                   }
               }

               this.resume();
           }
       }
);



