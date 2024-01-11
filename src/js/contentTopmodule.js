//stats & metrics gather
//Gather only on display of menu (lag API)

const ids = [/*"statsContentIssues", "statsContentContributor",
    "statsContentBuild", "statsContentDiscussion", "statsContentGithubStatus",*/
    "statsContentConsoleInfo"/*, "ContentLatestRSS"*/, "ContentMusic", "statsContentMenu"];

showTopmodule(true, "default");

function showTopmodule(forceBlock, menuName) {
    console.info("Loading top module stats");
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

function activateMenu(menuName, msg, count, div, text) {
    if (menuName === "statsContentConsoleInfo") {
        statsConsoleInfo("statsContentConsoleInfo", msg, count, div, text);
    }
}

function closeMenu() {
    for (i in ids) {
        var element = document.getElementById(ids[i]);
        element.classList.remove("visible");
    }
}

var warnCount = 0;
console.warn = function (msg) {
    warnCount++;
    activateMenu("statsContentConsoleInfo", msg, warnCount, "statsContentConsoleInfoWarn", "Warn");
    console.log(msg);
}

var errorCount = 0;
console.error = function (msg) {
    errorCount++;
    activateMenu("statsContentConsoleInfo", msg, errorCount, "statsContentConsoleInfoError", "Error");
    console.log(msg);
}

var infoCount = 0;
console.info = function (msg) {
    infoCount++;
    activateMenu("statsContentConsoleInfo", msg, infoCount, "statsContentConsoleInfoInfo", "Info");
    console.log(msg);
}

var traceCount = 0;
console.trace = function (msg) {
    traceCount++;
    activateMenu("statsContentConsoleInfo", msg, traceCount, "statsContentConsoleInfoTrace", "Trace");
    console.log(msg);
}

function statsConsoleInfo(menuName, msg, count, div, text) {
    if (menuName === "statsContentConsoleInfo") {
        if (div !== undefined) {
            if (msg === undefined) {
                msg = "...";
            }
            if (count === undefined) {
                count = 0;
            }

            if (text === undefined) {
                text = "ErrorType";
            }

            var countInfo = document.getElementById(div);
            var textOutput = text + " : " + count + " : " + msg;

            countInfo.textContent = textOutput;
        }
    }
}