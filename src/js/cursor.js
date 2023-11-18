document.addEventListener("mousemove", (event) => {
    let mousex = event.clientX - 15;
    let mousey = event.clientY - 10;
    let elem = document.getElementById("cursor");
    elem.style.left = mousex + 'px';
    elem.style.top = mousey + 'px';
});

for (item of document.getElementsByTagName("a")) {
    addHandlers(item);
}
for (item of document.getElementsByTagName("button")) {
    addHandlers(item);
}

function addHandlers(item) {
    item.addEventListener("mouseenter", linkEnterHandler);
    item.addEventListener("mouseleave", linkLeaveHandler);
}
function linkEnterHandler() {
    cursor.classList.add("hover");
}

function linkLeaveHandler() {
    cursor.classList.remove("hover");
}

window.addEventListener("mousedown", () => {
    cursor.classList.add("click");
});

window.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
});