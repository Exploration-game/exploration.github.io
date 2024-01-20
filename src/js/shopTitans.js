var APIURL = "https://smartytitans.com/api/info/";
//fetchShopTitansDataStart("guilde", "64766ee4300f3e7b2917892e"); 

function fetchShopTitansDataStart(statsType, id) {
    if (id === null || id === 'undefined') {
        console.log("get holder");
        var idHolder = document.getElementById("ShopTitansID");
        id = idHolder.value;
        if (id !== null && id !== 'undefined' && id !== '') { 
            fetchShopTitansDataStart(statsType, id);
        }
    }
    else {
        if (id !== null && id !== 'undefined') { 
        var button; var docMenu;
            
        hideDivShopTitans(["ShopTitansData", "ShopTitanDataInvestMenu", "ShopTitansDataGuild"]);
            
        if (statsType === "stats"){
            fetchShopTitansData(id);
            button = document.getElementById("statsButton");
            docMenu = document.getElementById("ShopTitansData");
        }
        else if (statsType === "invest") {
            fetchShopTitansDataInvest(id);
            button = document.getElementById("investButton");
            docMenu = document.getElementById("ShopTitanDataInvestMenu");
        }
        else if (statsType === "guilde") {
            fetchShopTitansDataGuilde(id);
            button = document.getElementById("guildButton");
            docMenu = document.getElementById("ShopTitansDataGuild");
        }
        button.style = "display:none";
        docMenu.style = "display:flex";
        }
    }
}

function hideDivShopTitans(id) {
    for (value in id) {
        var doc = document.getElementById(id[value]);
        doc.style = "display: none;";
    }
}

async function fetchShopTitansDataGuilde(id) {
    var city = await gather(APIURL + 'city/' + id);
    console.log(city);

    var data = await getValue(city, "data");
    console.log(data);

    var members = await getValue(data, "members");
    console.log(members);

    for (value in members) {
        var member = members[value];
        var pre;
        if (member.rank === 0) {
            pre = "🐤";
        } else if (member.rank === 1) {
            pre = "👔";
        } else if (member.rank === 2) {
            pre = "👑";
        }

        addData("ShopTitansDataGuild", pre, member.name);
        addData("ShopTitansDataGuild", "ID", member._id)

        var div = document.getElementById("ShopTitansDataGuild");
        var button1 = document.createElement("button");
        var button1p = document.createElement("p");
        button1.setAttribute("onClick", "fetchShopTitansDataStart('invest', '" + member._id + "')");
        button1p.textContent = "Invest";
        button1.appendChild(button1p);
        div.appendChild(button1);

        var div = document.getElementById("ShopTitansDataGuild");
        var button2 = document.createElement("button");
        var button2p = document.createElement("p");
        button2.setAttribute("onClick", "fetchShopTitansDataStart('stats', '" + member._id + "')");
        button2p.textContent = "Stats";
        button2.appendChild(button2p);
        div.appendChild(button2);

        addData("ShopTitansDataGuild", "Level", member.level);
        addData("ShopTitansDataGuild", "Gold", formatCompactNumber(member.gld));
        addData("ShopTitansDataGuild", "Investissement", formatCompactNumber(member.invst));
        addData("ShopTitansDataGuild", "Aides de guilde", member.help);
        addData("ShopTitansDataGuild", "Primes", member.bounty);

        addDataHR("ShopTitansDataGuild");
    }

    var button = document.getElementById("guildButton");
    button.style = "";

    //ajouter bâtiment data (même request)
    //ajouter les settings de guilde (pareil)
    //ajouter un logo ancien / nouveau (la liste membre est trié par défaut par âge en guilde)
    //bost upgrade lvl
}

async function fetchShopTitansDataInvest(id) {
    var investments = await gather(APIURL + 'player/' + id + '/investments');
    console.log(investments);

    var data = await getValue(investments, "data");
    console.log(data);

    var dataSorted = data.sort((a, b) => (a.value - b.value || a.uid.localeCompare(b.uid)));

    for (value in dataSorted) {
        var divID;
        var VIP = investIsVIP(getValue(data[value], "uid"));
        if (VIP === true) {
            divID = "ShopTitansDataInvestVIP";
        }
        else if (VIP === false) {
            divID = "ShopTitansDataInvest";
           
        }

        var urgentInvest = false;
        var topInvest = false;
        if (value >= 0 && value <= 12) {
            urgentInvest = true;
        } if (value >= 20) {
            topInvest = true;
        }

        if (urgentInvest === true) {
            addData(divID, "Bâtiment", getValue(data[value], "uid"));
            addData(divID, "Click", getValue(data[value], "ticks"));
            addData(divID, "Gold 👎", formatCompactNumber(getValue(data[value], "value")));
        } else if (topInvest === true) {
            addData(divID, "Bâtiment", getValue(data[value], "uid"));
            addData(divID, "Click", getValue(data[value], "ticks"));
            addData(divID, "Gold 👌", formatCompactNumber(getValue(data[value], "value")));
        }
        else {
            addData(divID, "Bâtiment", getValue(data[value], "uid"));
            addData(divID, "Click", getValue(data[value], "ticks"));
            addData(divID, "Gold", formatCompactNumber(getValue(data[value], "value")));
        }
        addDataHR(divID);
    }

    var button = document.getElementById("investButton");
    button.style = "";
}

async function fetchShopTitansData(id) {
    var player = await gather(APIURL + 'player/' + id);
    console.log(player);
    
    var data = await getValue(player, "data");
    console.log(data);
    var stats = await getValue(data, "stats");
    console.log(stats);
    var rankGld = await getValue(data, "rankGld");
    console.log(rankGld);

    var name = await getValue(data, "name");
    addData("ShopTitansData", "Nom", name);

    var lvl = await getValue(stats, "lvl");
    addData("ShopTitansData", "Niveau de marchand", lvl);

    var vip = await getValue(stats, "vip");
    addData("ShopTitansData", "VIP", vip);

    addDataHR("ShopTitansData",);

    var cityName = await getValue(data, "cityName");
    addData("ShopTitansData", "Guilde", cityName);

    var cityLevel = await getValue(data, "cityLevel");
    addData("ShopTitansData", "Niveau de guilde", cityLevel);

    addDataHR("ShopTitansData",);

    var gld = await getValue(stats, "gld");
    addData("ShopTitansData", "Gold", formatCompactNumber(gld));

    var sellfk = await getValue(stats, "sellfk");
    addData("ShopTitansData", "Vente au roi", formatCompactNumber(sellfk));

    var invst = await getValue(stats, "invst");
    addData("ShopTitansData", "Investissement", formatCompactNumber(invst));
    
    addDataHR("ShopTitansData",);

    var bounty = await getValue(stats, "bounty");
    addData("ShopTitansData", "Primes", bounty);

    var help = await getValue(stats, "help");
    addData("ShopTitansData", "Aides de guilde", help);

    addDataHR("ShopTitansData",);

    var accountage = await getValue(stats, "accountage");
    addData("ShopTitansData", "Âge du compte" ,accountage);

    var accountdb = await getValue(stats, "accountdb");
    addData("ShopTitansData", "Date du compte" , accountdb);

    addDataHR("ShopTitansData",);

    var rank = await getValue(rankGld, "rank");
    addData("ShopTitansData", "Rang global", rank);

    //rankStrAdv > strAdvClass,strAdvId,strAdvPow

    var button = document.getElementById("statsButton");
    button.style = "";
}

function addData(divID, titleData, dataValue) {
    var dataHolder = document.getElementById(divID);
    var elem = document.createElement("p");
    elem.textContent = titleData + " : " + dataValue;
    dataHolder.appendChild(elem);
}

function addDataHR(divID) {
    var dataHolder = document.getElementById(divID);
    var elem = document.createElement("hr");
    dataHolder.appendChild(elem);
}

function investIsVIP(invest){
    if (invest === "engineer" || invest === "academy" || invest === "baker" || invest === "moondragon" || invest === "bard" || invest === "elven")
    { return true; }
    return false;
}