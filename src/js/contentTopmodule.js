//stats & metrics gather
//Gather only on display of menu (lag API)

const ids = [/*"statsContentIssues", "statsContentContributor",
    "statsContentBuild", "statsContentDiscussion", "statsContentGithubStatus",*/
    "statsContentConsoleInfo", "ContentLatestRSS", "ContentMusic", "statsContentMenu"];

showTopmodule(true, "default");

function showTopmodule(forceBlock, menuName) {
    console.log("Loading top module stats");
    var topModule = document.getElementById("TopModule");

    if (topModule.style.display == "block") {
        topModule.style = "display:none;";
        closeMenu();
    } else if (topModule.style.display == "none") {
        topModule.style = "display:block;";
        showMenu(menuName);
    }

    if (forceBlock === true) {
        topModule.style = "display:block;";
        showMenu(menuName);
    }
    else if (forceBlock === false) {
        topModule.style = "display:none;";
        closeMenu();
    }
}

function showMenu(module) {
    closeMenu();

    if (module === "default") {
        var max = ids.length;
        var choiceRNG = Math.floor(Math.random() * max);
        var moduleName = ids[choiceRNG];
        module = moduleName;
    }

    for (i in ids) {
        if (module === ids[i]) {
            var element = document.getElementById(module);
            element.className = "visible";
            activateMenu(module);
        }
    }
}

async function activateMenu(menuName, msg, count, div, text) {
    if (menuName === "statsContentConsoleInfo") {
        await include_script("/src/js/consoleInfo.js");
        statsConsoleInfo("statsContentConsoleInfo", msg, count, div, text);
    }
    else if (menuName === "ContentLatestRSS") {
        console.warn("Beta feature");
    }
}

function closeMenu() {
    for (i in ids) {
        var element = document.getElementById(ids[i]);
        element.classList.remove("visible");
    }
}



function getRSS() {
    const RSS_URL = `https://codepen.io/picks/feed/`;

    fetch(RSS_URL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => console.log(data))
}