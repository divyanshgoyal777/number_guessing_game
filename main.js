const sketch = require("./sketch");

const loop = function (world) {
    while (sketch.running()) {
        sketch.update(world.gameData);
        sketch.draw(world.gameData);
    }
};

const main = function () {
    const world = sketch.setup();
    loop(world);
    sketch.teardown();
};

main();