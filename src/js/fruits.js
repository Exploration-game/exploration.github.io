var character = document.getElementById("character");
var container = document.getElementById("container");
var containerProps = document.getElementById("container-props");

var characterSizePx = window.getComputedStyle(character).width;
var characterSize = characterSizePx.replace("px", "");
var containerSizePx = window.getComputedStyle(container).width;
var containerSize = containerSizePx.replace("px", "");

var containerHeightPx = window.getComputedStyle(container).height;
var containerHeight = containerHeightPx.replace("px", "");
var characterHeightPx = window.getComputedStyle(character).height;
var characterHeight = characterHeightPx.replace("px", "");

var interval;
var keyPressed = false;

const fruits = [
    { "level": 1, "points": 25, "src": "/assets/fruits/coconut.png" },
    { "level": 2, "points": 100, "src": "/assets/fruits/lime.png" },
    { "level": 3, "points": 250, "src": "/assets/fruits/plum.png" },];

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 1 + "px";
    }
}
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < (containerSize - characterSize)) {
        character.style.left = left + 1 + "px"
    }
}

function spawnProps(path) {
    var props = document.createElement("img");

    containerProps.appendChild(props);

    props.src = path || fruits[0].src;

    props.classList.add("props");

    props.dataset.level = 1;

    //props.classList.add(fruits[0].level);

    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    props.style.left = left + "px";

    var propsHeight = parseInt(window.getComputedStyle(props).getPropertyValue("height"));
    props.style.top = -propsHeight + "px";
}

document.addEventListener("keydown", event => {
    if (keyPressed == false) {
        /*
        console.log("code " + event.code);
        console.log("Keycode " + event.keyCode);
        console.log("code " + event.key);
        */

        if (event.code === "ArrowLeft" || event.code === "KeyA") {
            keyPressed = true;
            interval = setInterval(moveLeft, 1);
        }

        if (event.code === "ArrowRight" || event.code === "KeyD") {
            keyPressed = true;
            interval = setInterval(moveRight, 1);
        }

        if (event.code === "Space" || event.code === "Enter") {
            spawnProps();
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    keyPressed = false;
});

var gameLoop = setInterval(function () {
    for (props of document.getElementsByClassName("props")) {
        var top = parseInt(window.getComputedStyle(props).getPropertyValue("top"));
        var propseHeightPx = window.getComputedStyle(props).height;
        var propseHeight = propseHeightPx.replace("px", "");

        if (top < (parseFloat(containerHeight) - parseFloat(propseHeight) * 2)) {
            props.style.top = top + 5 + "px";
        }
    }
}, 1);

var collideLoop = setInterval(function () {
    checkCollide();
}, 250);

window.addEventListener("gamepadconnected", function (e) {
    setInterval(function () {
        var gp = navigator.getGamepads()[e.gamepad.index];

        /*
        if (gp && gp.connected) {
            var axes = gp.axes;
            for (var i in axes) {
                if (axes[i] >= 0.3 || axes[i] <= -0.3) { console.log('axes[%s] value is: %s', i, axes[i]); };
            };


            var buttons = gp.buttons;
            for (var i in buttons) {
                if (buttons[i].pressed == true) { console.log("buttons[%s] pressed", i); };
            };
        };
        */

        if (gp && gp.connected && keyPressed == false) {
            var buttons = gp.buttons;
            var axes = gp.axes;

            if (buttons[14].pressed || buttons[4].pressed || buttons[6].pressed) {
                keyPressed = true;
                moveLeft();
            }
            if (buttons[15].pressed || buttons[5].pressed || buttons[7].pressed) {
                keyPressed = true;
                moveRight()
            }
            if (axes[0] <= -0.5 || axes[2] <= -0.5) {
                keyPressed = true;
                moveLeft();
            }
            if (axes[0] >= 0.5 || axes[2] >= 0.5) {
                keyPressed = true;
                moveRight();
            }
        }

        clearInterval(interval);
        keyPressed = false;

    }, 1);
});

function isColliding(prop, prop2) {
    const propHeight = parseInt(window.getComputedStyle(prop).getPropertyValue("height"));
    const propWidth = parseInt(window.getComputedStyle(prop).getPropertyValue("width"));
    const prop2Height = parseInt(window.getComputedStyle(prop2).getPropertyValue("height"));
    const prop2Width = parseInt(window.getComputedStyle(prop2).getPropertyValue("width"));
    const dx = parseInt(window.getComputedStyle(prop).getPropertyValue("left")) - parseInt(window.getComputedStyle(prop2).getPropertyValue("left"));
    const dy = parseInt(window.getComputedStyle(prop).getPropertyValue("top")) - parseInt(window.getComputedStyle(prop2).getPropertyValue("top"));
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = Math.sqrt(propWidth * propWidth + propHeight * propHeight) / 2;
    const radius2 = Math.sqrt(prop2Width * prop2Width + prop2Height * prop2Height) / 2;

    if (distance < radius + radius2) {
        afterCollide(prop, prop2);
    }
}

function checkCollide() {
    var props = document.getElementById("container-props");
    var propsChild = props.childNodes;
    for (const prop of props.children) {
        for (const prop2 of props.children) {
            if (prop !== prop2) {
                console.log(prop + "  :  " + prop2);
                isColliding(prop, prop2);
            }
        }
    }
}

function afterCollide(prop, prop2) {
    PropTop = parseInt(window.getComputedStyle(prop).getPropertyValue("top"));
    PropLeft = parseInt(window.getComputedStyle(prop).getPropertyValue("left"));

    Prop2Top = parseInt(window.getComputedStyle(prop2).getPropertyValue("top"));
    Prop2Left = parseInt(window.getComputedStyle(prop2).getPropertyValue("left"));

    medianneTop = ((PropTop + Prop2Top) / 2);
    medianneLeft = ((PropLeft + Prop2Left) / 2);

    var level = prop.dataset.level;
    var level2 = prop2.dataset.level;

    if (level === level2) {
        //check max level
        //if !max level do things
        //else go fck it
        if (1 === 1) {
            mergeProps(level, medianneTop, medianneLeft);

            prop.remove();
            prop2.remove();
        }
    }
}

function mergeProps(level, top, left) {
    var newProp = document.createElement("img");

    containerProps.appendChild(newProp);

    newProp.src = fruits[level].src;
    newProp.dataset.level = fruits[level].level;

    newProp.className = "props";

    newProp.style.left = left + "px";
    newProp.style.top = top + "px";
}