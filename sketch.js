const r = require("raylib");

const running = function () {
    return !r.WindowShouldClose();
};


const generateRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const setup = function () {
    const screen = {
        width: 600,
        height: 550
    };

    const gameData = {
        inputNum: "",
        guessStatus: "Idle",
        moves: 0,
        minRange: 0,
        maxRange: 2000,
    };

    gameData.target = generateRandomNumber(gameData.minRange, gameData.maxRange);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, "Number Guessing Game");
    r.SetTargetFPS(60);

    return { gameData };
};


const checkIsGuessed = function (gameData) {
    const number = Number(gameData.inputNum);
    const target = gameData.target;

    gameData.inputNum = "";

    if (number === target) {
        return "correct";
    } else if (number > target) {
        return "guess low";
    } else {
        return "guess high";
    }
};


const update = function (gameData) {
    const key = r.GetKeyPressed();

    switch (true) {
        case (key >= r.KEY_ZERO && key <= r.KEY_NINE):
            digit = Math.abs(key - r.KEY_ZERO);
            gameData.inputNum += digit;
            break;

        case (key === r.KEY_BACKSPACE):
            gameData.inputNum = gameData.inputNum.slice(0, -1);
            break;

        case (key === r.KEY_ENTER):
            gameData.guessStatus = checkIsGuessed(gameData);
            gameData.moves++;
            break;
    }
};

const drawHeader = function () {
    r.DrawText("NUMBER GUESSING GAME", 100, 35, 30, r.GOLD);
    r.DrawText("Can you guess the secret number?", 150, 80, 18, r.LIGHTGRAY);
    r.DrawRectangle(30, 130, 540, 350, r.Color(40, 48, 68, 255));
};

const drawBody = function (gameData) {
    r.DrawText("GUESS THE NUMBER", 175, 160, 24, r.WHITE);
    r.DrawText(
        `Between ${gameData.minRange} and ${gameData.maxRange}`,
        200, 200, 20, r.SKYBLUE
    );
    r.DrawText("YOUR GUESS", 70, 270, 18, r.LIGHTGRAY);
    r.DrawRectangle(65, 300, 200, 55, r.Color(25, 30, 45, 255));
    r.DrawText(String(gameData.inputNum), 85, 310, 30, r.WHITE);
    r.DrawText("MOVES", 450, 270, 18, r.LIGHTGRAY);
    r.DrawText(String(gameData.moves), 470, 305, 35, r.GOLD);
    r.DrawText("GAME STATUS", 70, 390, 18, r.LIGHTGRAY);
    r.DrawText(
        String(gameData.guessStatus),
        70, 425, 25, r.GREEN
    );
};

const drawFooter = function () {
    r.DrawText("GOOD LUCK!", 250, 510, 20, r.YELLOW);
};

const draw = function (gameData) {
    r.BeginDrawing();

    r.ClearBackground(r.Color(25, 30, 45, 255));

    drawHeader();
    drawBody(gameData);
    drawFooter();

    r.EndDrawing();
};

const teardown = function () {
    r.CloseWindow();
};

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};