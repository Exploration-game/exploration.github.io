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

    if (pathNameMatchPage("/") || pathNameMatchPage("/index")) {
        if (devMode()) {
            await devTest();
        } else {
            await includes();
            await include_html("/src/html/content/welcome.html", "content", true);
            await include_css("/src/css/welcome.css");
        }
    }

    else if (pathNameMatchPage("/github/statistiques")) {
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

    else if (pathNameMatchPage("/github/contributeur")) {
        await includes();

        await include_script("/src/js/gather.js");

        await include_html("/src/html/content/contributeur.html", "content", true);
        await include_script("/src/js/contributeur.js");
    }

    else if (pathNameMatchPage("/github/issues")) {
        await includes();

        await include_script("/src/js/gather.js");

        await include_html("/src/html/content/issues.html", "content", true);
        await include_css("/src/css/issues.css");
        await include_script("/src/js/issues.js");
    }

    else if (pathNameMatchPage("/github/readme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'profile/README.md'); });
    }

    else if (pathNameMatchPage("/github/contribuer")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'CONTRIBUTING.md'); });
    }

    else if (pathNameMatchPage("/github/support")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'SUPPORT.md'); });
    }

    else if (pathNameMatchPage("/github/security")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'SECURITY.md'); });
    }

    else if (pathNameMatchPage("/github/license")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'LICENSE.md'); });
    }

    else if (pathNameMatchPage("/github/code_of_conduct")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'CODE_OF_CONDUCT.md'); });
    }

    else if (pathNameMatchPage("/cours/readme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/README.md'); });
    }

    else if (pathNameMatchPage("/cours/markdown")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Github/Markdown/Learning.md'); });
    }

    else if (pathNameMatchPage("/cours/github-readme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('github/.github', 'profile/README.md'); });
    }

    else if (pathNameMatchPage("/cours/fibre")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Network/Fibre/README.md'); });
    }

    else if (pathNameMatchPage("/cours/html")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/HTML/learning.md'); });
    }

    else if (pathNameMatchPage("/cours/css")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/CSS/learning.md'); });
    }

    else if (pathNameMatchPage("/cours/js")) {
        await includes();
        await include_script("/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/JS/learning.md'); });
    }

    else if (pathNameMatchPage("/settings")) {
        await includes();

        await include_css("/src/css/settings.css");
        await include_html("/src/html/content/settings.html", "content", true);
        await include_script("/src/js/settings.js");
    }

    else if (pathNameMatchPage("/outils/matrice")) {
        await include_html("/src/html/include/content.html", "body", false);
        await include_multiple("matrice", "content");
    }

    else if (pathNameMatchPage("/outils/rss")) {
        await includes();
        await include_script("/src/js/rss.js");
    }

    else if (pathNameMatchPage("/admin/film")) {
        await includes();

        await include_css("/src/css/film.css");
        await include_html("/src/html/content/film.html", "content", true);
    }

    else if (pathNameMatchPage("/admin/music")) {
        await includes();

        await include_css("/src/css/music.css");
        await include_html("/src/html/content/music.html", "content", true);
    }

    else if (pathNameMatchPage("/admin/contact")) {
        await includes();

        await include_css("/src/css/contact.css");
        await include_html("/src/html/content/contact.html", "content", true);
    }

    else if (pathNameMatchPage("/discord/login")) {
        await includes();

        await include_css("/src/css/discord.css");
        await include_html("/src/html/content/discord-login.html", "content", true);
    }

    else if (pathNameMatchPage("/discord/tools")) {
        await includes();

        await include_css("/src/css/discord.css");
        await include_script("/src/js/discord-login.js");
    }

    else {
        await includes();

        await include_css("/src/css/404.css");
        await include_html("/src/html/content/404.html", "content", true);
        console.warn("Erreur : 404");

        if (pathNameMatchPage("/404")) {
            await include_html("/src/html/content/404-custom.html", "erreur", true);
        }
    }

    if (!devMode()) {
        await include_script("/src/js/viewcount.js");
    } else {
        var devFooter = document.getElementById("devFooter");
        devFooter.style = "";
    }

    await include_script("/src/js/cursor.js");
}

function getShortPathname() {
    var path = window.location.pathname;
    path = path.replace(".html", "");
    return path;
}

function pathNameMatchPage(path) {
    var pathname = getShortPathname();
    if (path.toLowerCase() === pathname.toLowerCase()) {
        console.log("Loading : " + pathname);
        return true;
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