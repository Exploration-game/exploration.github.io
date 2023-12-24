start()

async function start() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => setIPv4(data.ip));

    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => setIPv6(data.ip));

    show();
}

function setIPv4(string) {
    document.getElementById("ipv4").textContent = string;
}

function setIPv6(string) {
    document.getElementById("ipv6").textContent = string;
}

function logIntoDocumentBR() {
    document.getElementById("logger").innerHTML += "<br>";
}

function logIntoDocumentHR() {
    document.getElementById("logger").innerHTML += "<hr>";
}

async function show() {
    logIntoDocumentHR();

    logIntoDocument("Langue : ", navigator.language);
    logIntoDocument("Langue(s) : ", navigator.languages);

    logIntoDocumentHR();

    logIntoDocument("OS : ", navigator.userAgentData.platform);
    logIntoDocument("Téléphone : ", navigator.userAgentData.mobile);
    logIntoDocument("Browser : ", navigator.vendor);
    logIntoDocument("user agent : ", window.navigator.userAgent);
    logIntoDocument("Memory : ", navigator.deviceMemory + "GB of browser RAM");
    logIntoDocument("logical processors : ", navigator.hardwareConcurrency);

    logIntoDocumentHR();

    const adapter = await navigator.gpu.requestAdapter();
    for (value in adapter.limits) {
        logIntoDocument(value + " : ", adapter.limits[value]);
    }


    const battery = navigator.getBattery();
    battery.then((resultat) => {
        for (value in resultat) {
            if ((!value.startsWith("on") && !value.includes("change")) && !value.includes("Event")) {
                logIntoDocument(value + " : ", resultat[value]);
            }
        }
    });

    logIntoDocumentHR();

    if ("credentials" in navigator) {
        navigator.credentials.get({ password: true }).then((creds) => {
            if (creds != null) {
                logIntoDocumentHR();
                logIntoDocument(creds);
                logIntoDocumentHR();
            }
        });
    }
}


function logIntoDocument(text, data) {
    document.getElementById("logger").innerHTML += "<h1>" + text + "</h1><p>" + data + "</p><br>";
}