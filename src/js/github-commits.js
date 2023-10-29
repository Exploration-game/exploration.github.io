(async function () {
    await getCommits();
})();


async function getCommits() {
    console.info("Getting Github-Commits");

    var x = await gather('https://api.github.com/repos/GHub-FR/Ghub-fr.github.io/commits');
    for (let i = 1; i < 11; i++) {
        var y = getValue(x[i], "sha");
        if (String(y).length >= 8)
        {
            var y2 = String(y.substring(0, 12) + "...");
        }
        var z = getValue(x[i], "commit")
        var z2 = getValue(z, "author");
        var name = getValue(z2, "name");

        var date = getValue(z2, "date");
        const date1 = new Date(date);
        var date2 = date1.toLocaleString();

        var message = getValue(z, "message");

        var gatherAvatar = getValue(x[i], "author");
        var avatarGatherValue = getValue(gatherAvatar, "avatar_url");

        console.log(i + " : " + name + ", " + message + ". " + date);

        var div = document.getElementById("github-commits");
        var newDiv = document.createElement("div");
        var image = document.createElement("img");
        image.src = avatarGatherValue;
        var user = document.createElement("p");
        user.textContent = name;
        var TextMessage = document.createElement("p");
        TextMessage.textContent = message;
        var TextDate = document.createElement("p");
        TextDate.textContent = date2;
        var link = document.createElement("a");
        link.href = "https://github.com/" + name;
        var sha = document.createElement("p");
        sha.textContent = y2;
        var logo = document.createElement("img");
        logo.src = "/assets/svg/network.svg";
        logo.classList = "svg";

        newDiv.appendChild(image);
        newDiv.appendChild(user);
        newDiv.appendChild(TextMessage);
        newDiv.appendChild(TextDate);
        newDiv.appendChild(sha);
        link.appendChild(logo);
        newDiv.appendChild(link);

        div.appendChild(newDiv);
    }
}