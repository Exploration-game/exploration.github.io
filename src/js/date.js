var id = "date";

setDateHTML();

setInterval(getDate, 250);

function setDateHTML() {
    var div = document.createElement("div");

    var date = document.createElement("p")
    date.id = id;

    var dateTimeZone = document.createElement("p");
    dateTimeZone.id = id + "TimeZone";

    var content = document.querySelector("#content");

    content.appendChild(div);

    div.appendChild(date);
    div.appendChild(dateTimeZone);
}

function getDate() {
    const date1 = new Date(Date.now());
    var date2 = date1.toLocaleString();

    document.getElementById(id).textContent = date2;
    document.getElementById(id + "TimeZone").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}