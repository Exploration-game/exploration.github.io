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
            countInfo.style = "padding-left: 12px;";
        }
    }
}