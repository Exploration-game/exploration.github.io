index(); async function index() {
    console.info("Loading website");
    await Metadata();
    await pages();
}

async function includes() {
    await styles();

    console.info("Loading includes");

    await include_html("/src/html/include/header.html", "body", false);

    await include_html("/src/html/include/anchor.html", "body", false);
    await setIconTheme();

    await include_html("/src/html/include/content.html", "body", false);
    await include_html("/src/html/include/searchbar.html", "body", false);
    await include_script("/src/js/searchbar.js");

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
    await include_css("/src/css/cursor.css");
    await include_css("/src/css/footer.css");
    await include_css("/src/css/scrollbar.css");
    await include_css("/src/css/searchbar.css");
}

async function Metadata() {
    var title = getShortPathname().replaceAll("/", " ");
    document.title = "GHub 📰 " + title;

    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = "/assets/icon/icone.png";
    document.head.appendChild(link);
}

async function pages() {
    console.info("Loading custom page");

    if (pathNameMatchPage("/", true) || pathNameMatchPage("/index", true)) {
        if (devMode()) {
            await devTest();
        } else {
            await includes();
            await include_html("/src/html/content/welcome.html", "content", true);
            await include_css("/src/css/welcome.css");
        }
    }

    //Outils/settings ???
    else if (pathNameMatchPage("/settings", true)) {
        await includes();

        await include_css("/src/css/settings.css");
        await include_html("/src/html/content/settings.html", "content", true);
        await include_script("/src/js/settings.js");
    }

    else if (pathNameMatchPage("/github", false)) { await pageGithub(); }
    else if (pathNameMatchPage("/cours", false)) { await pageCours(); }
    else if (pathNameMatchPage("/outils", false)) { await pageOutils(); }
    else if (pathNameMatchPage("/admin", false)) { await pageAdmin(); }

    //TO move in /outils/discord/login
    //then move to async function pageOutils()
    else if (pathNameMatchPage("/discord/login", true)) {
        await includes();

        await include_css("/src/css/discord.css");
        await include_html("/src/html/content/discord-login.html", "content", true);
    }

    else if (pathNameMatchPage("/discord/tools", true)) {
        await includes();

        await include_css("/src/css/discord.css");
        await include_script("/src/js/discord-login.js");
    }

    //TO move in //games/fruits
    //then move to async function pageGames() //Create it
    else if (pathNameMatchPage("/games/fruits", true)) {
        await include_css("/src/css/user-agent.css");
        await include_css("/src/css/font.css");
        await include_css("/src/css/theme.css");

        await include_css("/src/css/fruits.css");
        await include_html("/src/html/content/fruits.html", "body", false);
        await include_script("/src/js/fruits.js");
    }

    else {
        await includes();

        await include_css("/src/css/404.css");
        await include_html("/src/html/content/404.html", "content", true);
        console.warn("Erreur : 404");

        if (pathNameMatchPage("/404", true)) {
            await include_html("/src/html/content/404-custom.html", "erreur", true);
        }
    }

    if (!devMode()) {
        await include_script("/src/js/viewcount.js");
    } else {
        var devFooter = document.getElementById("devFooter");
        if (devFooter != null) {
            devFooter.style = "";
        }
    }

    await include_script("/src/js/date.js");
    await include_script("/src/js/cursor.js");
}

async function pageGithub() {
    if (pathNameMatchPage("/github/statistiques", true)) {
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

    else if (pathNameMatchPage("/github/contributeur", true)) {
        await includes();

        await include_script("/src/js/gather.js");

        await include_html("/src/html/content/contributeur.html", "content", true);
        await include_script("/src/js/contributeur.js");
    }

    else if (pathNameMatchPage("/github/issues", true)) {
        await includes();

        await include_script("/src/js/gather.js");

        await include_html("/src/html/content/issues.html", "content", true);
        await include_css("/src/css/issues.css");
        await include_script("/src/js/issues.js");
    }

    else if (pathNameMatchPage("/github/readme", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'profile/README.md'); });
    }

    else if (pathNameMatchPage("/github/contribuer", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'CONTRIBUTING.md'); });
    }

    else if (pathNameMatchPage("/github/support", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'SUPPORT.md'); });
    }

    else if (pathNameMatchPage("/github/security", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'SECURITY.md'); });
    }

    else if (pathNameMatchPage("/github/license", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'LICENSE.md'); });
    }

    else if (pathNameMatchPage("/github/code_of_conduct", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'CODE_OF_CONDUCT.md'); });
    }
}

async function pageCours() {
    if (pathNameMatchPage("/cours/readme", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/README.md'); });
    }

    else if (pathNameMatchPage("/cours/markdown", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Github/Markdown/Learning.md'); });
    }

    else if (pathNameMatchPage("/cours/github-readme", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('github/.github', 'profile/README.md'); });
    }

    else if (pathNameMatchPage("/cours/fibre", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Network/Fibre/README.md'); });
    }

    else if (pathNameMatchPage("/cours/html", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/HTML/learning.md'); });
    }

    else if (pathNameMatchPage("/cours/css", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/CSS/learning.md'); });
    }

    else if (pathNameMatchPage("/cours/js", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/JS/learning.md'); });
    }

    else if (pathNameMatchPage("/cours/binaire", true)) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/Binaire/learning.md'); });
    }
}

async function pageOutils() {
    if (pathNameMatchPage("/outils/matrice", true)) {
        await include_html("/src/html/include/content.html", "body", false);
        await include_multiple("matrice", "content");
    }

    else if (pathNameMatchPage("/outils/cube", true)) {
        await include_html("/src/html/include/content.html", "body", false);
        await include_html("/src/html/content/cube.html", "content", true);
        await include_css("/src/css/cube.css");
    }

    else if (pathNameMatchPage("/outils/rss", true)) {
        await includes();
        await include_script("/src/js/rss.js");
    }

    else if (pathNameMatchPage("/outils/logger", true)) {
        await includes();
        await include_css("/src/css/logger.css");
        await include_html("/src/html/content/logger.html", "content", true);
        await include_script("/src/js/logger.js");
    }

    else if (pathNameMatchPage("/outils/caesar", true)) {
        await includes();
        await include_multiple("caesar", "content");
    }
}

async function pageAdmin() {
    if (pathNameMatchPage("/admin/film", true)) {
        await includes();

        await include_css("/src/css/film.css");
        await include_html("/src/html/content/film.html", "content", true);
    }

    else if (pathNameMatchPage("/admin/music", true)) {
        await includes();

        await include_css("/src/css/music.css");
        await include_html("/src/html/content/music.html", "content", true);
    }

    else if (pathNameMatchPage("/admin/contact", true)) {
        await includes();

        await include_css("/src/css/contact.css");
        await include_html("/src/html/content/contact.html", "content", true);
    }
}

function getShortPathname() {
    var path = window.location.pathname;
    path = path.replace(".html", "");
    return path;
}

function pathNameMatchPage(path, strict) {
    var pathname = getShortPathname();
    if (strict === true) {
        if (path.toLowerCase() === pathname.toLowerCase()) {
            console.log("Loading : " + pathname);
            return true;
        }
    }
    else if (strict === false) {
        var lowerCasePath = path.toLowerCase();
        if (pathname.startsWith(lowerCasePath.toLowerCase())) {
            console.log("Finding : " + lowerCasePath + "/...");
            return true;
        }
    }
    return false;
}

function devMode() {
    if (window.location.hostname === "127.0.0.1") {
        return true;
    }
    if (localStorage.getItem('devMode') == "true") {
        return true;
    }
    else {
        return false;
    }
}

async function devTest() {
    console.log("Dev mode ON : " + window.location.hostname);
    await includes();

    //Test module ⏬
}