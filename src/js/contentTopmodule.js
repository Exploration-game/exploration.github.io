//Button gesture
//and close

//stats & metrics gather
//Gather only on display of menu (lag API)

const ids = [/*"statsContentIssues", "statsContentContributor",
    "statsContentBuild", "statsContentDiscussion", "statsContentGithubStatus",*/
    "statsContentConsoleInfo"/*, "ContentLatestRSS"*/, "ContentMusic", "statsContentMenu"];

showTopmodule(true, "default");

function showTopmodule(forceBlock, menuName) {
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
    console.info("Loading top module stats sub module");

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

function activateMenu(menuName, msg) {
    if (menuName === "statsContentConsoleInfo") {
        var countInfo = document.getElementById("statsContentConsoleInfoInfo");
        countInfo.textContent = "Warn : " + warnCount + ", " + msg;
    }
}

function closeMenu() {
    console.log("Closing other subMenu")
    for (i in ids) {
        var element = document.getElementById(ids[i]);
        element.classList.remove("visible");
    }
}

var warnCount = 0;
console.warn = function (msg) {
    warnCount++;
    activateMenu("statsContentConsoleInfo", msg, warnCount);
    console.info(msg);
}