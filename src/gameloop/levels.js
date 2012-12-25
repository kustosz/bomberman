define("gameloop/levels",
       [],
       function () {
           return [
               {
                   level: "1",
                   time: 300,
                   bricksDensity: 0.2,
                   goombas: [10],
                   powerup: "increaseRange",
                   penaltyGoombas: 5,
                   penaltyGoombaLevel: 1
               },
               {
                   level: "2",
                   time: 300,
                   bricksDensity: 0.2,
                   goombas: [7, 3],
                   powerup: "addBomb",
                   penaltyGoombas: 5,
                   penaltyGoombaLevel: 2
               },
               {
                   level: "3",
                   time: 300,
                   bricksDensity: 0.2,
                   goombas: [6, 3, 1],
                   powerup: "increaseRange",
                   penaltyGoombas: 5,
                   penaltyGoombaLevel: 2
               },
               {
                   level: "4",
                   time: 300,
                   bricksDensity: 0.2,
                   goombas: [3, 3, 3],
                   powerup: "addBomb",
                   penaltyGoombas: 5,
                   penaltyGoombaLevel: 2
               },
               {
                   level: "5",
                   time: 300,
                   bricksDensity: 0.2,
                   goombas: [0, 8, 2],
                   powerup: "increaseRange",
                   penaltyGoombas: 5,
                   penaltyGoombaLevel: 2
               },
               {
                   level: "6",
                   time: 300,
                   bricksDensity: 0.2,
                   goombas: [0, 2, 8],
                   powerup: "increaseRange",
                   penaltyGoombas: 5,
                   penaltyGoombaLevel: 2
               }
           ]
});
