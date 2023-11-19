start("Ghub-fr");

async function start(orgs) {
    await getRepo(orgs);
}

async function getIssues(repo, orgs) {
    var x = await gather('https://api.github.com/repos/' + orgs + '/' + repo + '/issues');
    for (var i in x) {
        var issueURL = getValue(x[i], "html_url");
        var issueTitle = getValue(x[i], "title");

        var user = getValue(x[i], "user");
        var userLogin = getValue(user, "login");
        var userAvatar = getValue(user, "avatar_url");

        var state = getValue(x[i], "state");
        var dateUpdate = getValue(x[i], "updated_at");
        var body = getValue(x[i], "body");

        await display(issueURL, repo, issueTitle, userLogin, userAvatar, state, dateUpdate, body);
    }
}

async function getRepo(orgs) {
    var x = await gather('https://api.github.com/orgs/' + orgs + '/repos');
    var contributors = [];
    for (var i in x) {
        var repo = await getValue(x[i], "name");
        await getIssues(repo, orgs);
    }
}

async function display(issueURL, repo, issueTitle, userLogin, userAvatar, state, dateUpdate, body) {
    var root = document.getElementById("github_issue");

    var div = document.createElement('div');
    div.style = "display: inline-block;margin:20px;"

    var img = document.createElement('img');
    img.src = userAvatar;
    img.style = "max-width: 100px;max-height:100px;border-radius:25px;";
    div.appendChild(img);

    var img2 = document.createElement('img');
    if (state === "open") {
        img2.src = "/assets/svg/issue.svg";
    } else {
        img2.src = "/assets/svg/issue-closed.svg";
    }
    img2.className = "svg";
    img2.style = "max-width: 50px;max-height:50px;padding-top:10px;padding-bottom:10px;padding-left:15px;";
    div.appendChild(img2);

    var a = document.createElement('a');
    a.textContent = userLogin;
    a.href = "https://github.com/" + userLogin;
    a.style = "display:block;";
    div.appendChild(a);

    var a2 = document.createElement('a');
    a2.href = issueURL;
    a2.textContent = issueTitle;
    div.appendChild(a2);

    var p = document.createElement('p');
    const date1 = new Date(dateUpdate);
    var date2 = date1.toLocaleString();
    p.textContent = date2;
    div.appendChild(p);

    var p3 = document.createElement('p');
    p3.textContent = repo;
    p3.style = "padding-bottom:10px;";
    div.appendChild(p3);

    var p2 = document.createElement('p');
    p2.textContent = body;
    div.appendChild(p2);

    root.append(div);

    document.getElementById("loading").style = "display:none;";
}