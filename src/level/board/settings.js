define({
    SQUARE_WIDTH: 60,
    SQUARE_HEIGHT: 60,
    ROWS: 13,
    COLS: 31,
    BRICKS_SRC: "images/bricks.png",
    CONCRETE_SRC: "images/concrete.png",
    EMPTY_SRC: "images/empty.png",
    CHARACTER_SRC: "images/character.png",
    CHARACTER_DEAD_SRC: "images/characterKilled.png",
    BOMB_SRC: "images/bomb.png",
    FLAMES_SRC: "images/flames.png",
    CHARACTER_WIDTH: 40,
    CHARACTER_HEIGHT: 40,
    CHARACTER_INITIAL_X: 70,
    CHARACTER_INITIAL_Y: 70,
    BOMB_TIMEOUT: 2000,
    FLAMES_TIMEOUT: 100,
    GOOMBA_TIMEOUT: 1000,
    GOOMBA_WIDTH: 40,
    GOOMBA_HEIGHT: 40,
    GOOMBAS: [{SRC: "images/goombaLevel0.png",
               DEAD_SRC: "images/goombaLevel0Killed.png",
               BASE_SPEED: 2,
               PR_TURN: 0.5,
               PR_TURN_BACK: 0.2},
              {SRC: "images/goombaLevel1.png",
               DEAD_SRC: "images/goombaLevel1Killed.png",
               BASE_SPEED: 4,
               PR_TURN: 0.5},
              {SRC: "images/goombaLevel2.png",
               DEAD_SRC: "images/goombaLevel2Killed.png",
               BASE_SPEED: 6,
               PR_TURN: 0.2},
              {SRC: "images/goombaLevel3.png",
               DEAD_SRC: "images/goombaLevel3Killed.png",
               BASE_SPEED: 7,
               PR_TURN: 0.8}],
    GAMEOVER_TIMEOUT: 1000,
    SUCCESS_TIMEOUT: 1000,
    DOOR_SRC: "images/door.png",
    TOPMARGIN: 40,
    ADDBOMB_SRC: "images/addBomb.png",
    INCREASERANGE_SRC: "images/increaseRange.png"
});
