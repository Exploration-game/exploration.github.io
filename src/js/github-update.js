(async function () {
    await getUpdate();
})();


async function getUpdate() {
    console.info("Getting Github-Update");

    var x = await gather('https://api.github.com/repos/GHub-FR/Ghub-fr.github.io/commits');
    var y = getValue(x[0], "sha");
    if (String(y).length >= 8) {
        var y2 = String(y.substring(0, 12) + "...");
    }

    document.getElementById("hash").href += y;
    document.getElementById("hash").textContent = "📊 Hash : " + y2;

    var z = getValue(x[0], "commit")
    var z2 = getValue(z, "author");

    var name = getValue(z2, "name");
    document.getElementById("author").href += name;
    document.getElementById("author").textContent = "👤 Par : " + name;

    var date = getValue(z2, "date");
    const date1 = new Date(date);
    var date2 = date1.toLocaleString();
    document.getElementById("date").textContent = "⏰ " + date2;

    var message = getValue(z, "message")
    document.getElementById("message").textContent = "💬 " + message;

    var gatherAvatar = getValue(x[0], "author");
    var avatarGatherValue = getValue(gatherAvatar, "avatar_url");

    document.getElementById("author-image").src = avatarGatherValue;

    var deployment = await gather('https://api.github.com/repos/lx78WyY0J5/lx78WyY0J5.github.io/deployments');
    var deploymentID = await getValue(deployment[0], "id");

    var deploymentStatus = await gather('https://api.github.com/repos/lx78WyY0J5/lx78WyY0J5.github.io/deployments/' + deploymentID + '/statuses');
    var deploymentStatusState = await getValue(deploymentStatus[0], "state");
    var deploymentStatusUrl = await getValue(deploymentStatus[0], "log_url");

    document.getElementById("status").href = deploymentStatusUrl;
    document.getElementById("status").textContent = "⭕ Build : " + deploymentStatusState;
}