var cursor = document.getElementById("cursor");

getHandler();

document.addEventListener("mousemove", (event) => {
    if (cursor != null) {
        let mousex = event.clientX - 15;
        let mousey = event.clientY - 10;
        cursor.style.left = mousex + 'px';
        cursor.style.top = mousey + 'px';
    }
});

function getHandler() {
    if (cursor != null) {
        for (item of document.getElementsByTagName("a")) {
            addHandlers(item);
        }
        for (item of document.getElementsByTagName("button")) {
            addHandlers(item);
        }
        for (item of document.getElementsByTagName("input")) {
            addHandlers(item);
        }
        for (item of document.getElementsByTagName("summary")) {
            addHandlers(item);
        }
    }
}

function addHandlers(item) {
    item.addEventListener("mouseenter", linkEnterHandler);
    item.addEventListener("mouseleave", linkLeaveHandler);
}

function linkEnterHandler() {
    if (cursor != null) {
        cursor.classList.add("hover");
    }
}

function linkLeaveHandler() {
    if (cursor != null) {
        cursor.classList.remove("hover");
    }
}

window.addEventListener("mousedown", () => {
    if (cursor != null) {
        cursor.classList.add("click");
    }
});

window.addEventListener("mouseup", () => {
    if (cursor != null) {
        cursor.classList.remove("click");
    }
});