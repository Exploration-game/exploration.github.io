var warnCount = 0;
var warnMsg = "";
console.warn = function (msg) {
    warnCount++;
    warnMsg = msg;
    statsConsoleInfo( msg, warnCount, "statsContentConsoleInfoWarn", "Warn");
    console.log(msg);
}

var errorCount = 0;
var errorMsg = "";
console.error = function (msg) {
    errorCount++;
    errorMsg = msg;
    statsConsoleInfo( msg, errorCount, "statsContentConsoleInfoError", "Error");
    console.log(msg);
}

var infoCount = 0;
var infoMsg = "";
console.info = function (msg) {
    infoCount++;
    infoMsg = msg;
    statsConsoleInfo( msg, infoCount, "statsContentConsoleInfoInfo", "Info");
    console.log(msg);
}

var traceCount = 0;
var traceMsg = "";
console.trace = function (msg) {
    traceCount++;
    traceMsg = msg;
    statsConsoleInfo( msg, traceCount, "statsContentConsoleInfoTrace", "Trace");
    console.log(msg);
}

async function statsConsoleInfo(msg, count, div, text) {
    await include_script("/src/js/contentTopModule.js");
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
            if(countInfo !== null){
                var textOutput = text + " : " + count + " : " + msg;

                countInfo.textContent = textOutput;
                countInfo.style = "padding-left: 12px;";
            }
        }
}

function statsConsoleSetup() {
    if (errorCount > 0) {
        statsConsoleInfo(errorMsg, errorCount, "statsContentConsoleInfoError", "Error");
    }
    
    if (warnCount > 0) {
        statsConsoleInfo(warnMsg, warnCount, "statsContentConsoleInfoWarn", "Warn");
    }
    
    if (infoCount > 0) {
        statsConsoleInfo(infoMsg, infoCount, "statsContentConsoleInfoInfo", "Info");
    }
    
    if (traceCount > 0) {
        statsConsoleInfo(traceMsg, traceCount, "statsContentConsoleInfoTrace", "Trace");
    }
}