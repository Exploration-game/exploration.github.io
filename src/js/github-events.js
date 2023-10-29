(async function () {
    await getCommits(5);
})();


async function getCommits(amount) {
    console.info("Getting Github-PushEvent");

    var x = await gather('https://api.github.com/orgs/GHub-fr/events');
    var iResult = 0;
    for (var i in x) {
        var eventType = getValue(x[i], "type");
        if (eventType === "PushEvent") {
            var actor = getValue(x[i], "actor");
            var login = getValue(actor, "login");
            var avatar = getValue(actor, "avatar_url");

            var repo = getValue(x[i], "repo");
            var name = getValue(repo, "name");

            var payload = getValue(x[i], "payload");
            var commits = getValue(payload, "commits");

            var date = getValue(x[i], "created_at");

            var div = document.getElementById("github-events");
            var newDiv = document.createElement("div");

            var image = document.createElement("img");
            image.src = avatar;
            var user = document.createElement("p");
            user.textContent = login;
            var RepoName = document.createElement("p");
            var name2 = name.split("/")[1];
            RepoName.textContent = name2;

            var TextDate = document.createElement("p");
            const date1 = new Date(date);
            var date2 = date1.toLocaleString();
            TextDate.textContent = date2;

            var link = document.createElement("a");
            link.href = "https://github.com/GHub-fr/" + name;
            var logo = document.createElement("img");
            logo.src = "/assets/svg/link.svg";
            logo.classList = "svg";

            newDiv.appendChild(image);
            newDiv.appendChild(user);
            newDiv.appendChild(RepoName);
            newDiv.appendChild(TextDate);
            for (var i2 in commits) {
                var sha = getValue(commits[i2], "sha");
                var message = getValue(commits[i2], "message");

                var TextMessage = document.createElement("p");
                TextMessage.textContent = message;

                var shaText = document.createElement("p");
                if (String(sha).length >= 8) {
                    var sha2 = String(sha.substring(0, 12) + "...");
                }
                shaText.textContent = sha2;

                newDiv.appendChild(shaText);
                newDiv.appendChild(TextMessage);
            }

            link.appendChild(logo);
            newDiv.appendChild(link);
            div.appendChild(newDiv);

            iResult++;
            if (iResult >= amount) {
                break;
            }
        }
    }
} 