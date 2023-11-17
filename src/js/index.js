index(); async function index() {
    console.info("Loading index");
    if (!devMode()) {
        await pages();
    }
}

async function includes() {
    await styles();

    console.info("Loading includes");

    await include_html("/src/html/include/header.html", "body", false);
    await include_html("/src/html/include/anchor.html", "body", false);
    await setIconTheme();
    await include_html("/src/html/include/content.html", "body", false);

    await include_html("/src/html/include/footer.html", "body", false);
}

async function styles() {
    console.info("Loading style");

    await include_css("/src/css/theme.css");
    await include_script("/src/js/theme.js");
    await include_css("/src/css/font.css");
    await include_css("/src/css/user-agent.css");
    await include_css("/src/css/header.css");
    await include_css("/src/css/header-navbar.css");
    await include_css("/src/css/anchor.css");
    await include_css("/src/css/content.css");
    await include_css("/src/css/footer.css");
}

async function pages() {
    console.info("Loading custom page");

    if (pathNameMatchPage("") || pathNameMatchPage("index")) {
        await includes();

        await include_html("/src/html/content/welcome.html", "content", true);
        await include_css("/src/css/welcome.css");
    }

    else if (pathNameMatchPage("statistiques")) {
        await includes();

        await include_script("/src/js/gather.js");

        await include_css("/src/css/github-update.css");
        await include_html("/src/html/content/github-update.html", "content", true);
        await include_script("/src/js/github-update.js");

        await include_css("/src/css/github-commits.css");
        await include_html("/src/html/content/github-commits.html", "content", true);
        await include_script("/src/js/github-commits.js");

        await include_css("/src/css/github-events.css");
        await include_html("/src/html/content/github-events.html", "content", true);
        await include_script("/src/js/github-events.js");
    }

    else if (pathNameMatchPage("readme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('Ghub-fr/.github', 'profile/README.md'); });
    }

    else if (pathNameMatchPage("contribuer")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('Ghub-fr/.github', 'CONTRIBUTING.md'); });
    }

    else if (pathNameMatchPage("notereadme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('Ghub-fr/.github', 'note/README.md'); });
    }

    else if (pathNameMatchPage("markdownlearning")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('Ghub-fr/.github', 'note/Github/Markdown/Learning.md'); });
    }

    else if (pathNameMatchPage("settings")) {
        await includes();

        await include_css("/src/css/settings.css");
        await include_html("/src/html/content/settings.html", "content", true);
        await include_script("/src/js/settings.js");
    }

    else if (pathNameMatchPage("404")) {
        await includes();
        //ajouter un 404 custom (easter egg)
    }

    else {
        await includes();
        //ajouter le 404 par défault
    }
}

function pathNameMatchPage(path) {
    var pathname = window.location.pathname;
    pathname = pathname.replace(".html", "");
    pathname = pathname.replaceAll("/", "");
    if (path.toLowerCase() === pathname.toLowerCase()) {
        console.log("Loading : " + pathname);
        return true;
    }
    return false;
}

function devMode() {
    console.log(window.location.hostname);
    if (window.location.hostname === "127.0.0.1") {
        console.log("Dev mode ON");
        devTest();
        return true;
    }
    else {
        return false;
    }
}

async function devTest() {
    await includes();
}