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

    props.src = path || "/assets/fruits/banana.png";

    props.className = "props";

    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    props.style.left = left + "px";

    var propsHeight = parseInt(window.getComputedStyle(props).getPropertyValue("height"));
    props.style.top = -propsHeight + "px";

    console.log(propsHeight);
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

