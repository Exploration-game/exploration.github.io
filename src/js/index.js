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
    document.title = "📰 " + "GHub " + getShortPathname();

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
            devTest();
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

    else if (pathNameMatchPage("/github/readme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'profile/README.md'); });
    }

    else if (pathNameMatchPage("/github/contribuer")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'CONTRIBUTING.md'); });
    }

    else if (pathNameMatchPage("/github/support")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'SUPPORT.md'); });
    }

    else if (pathNameMatchPage("/github/security")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'SECURITY.md'); });
    }

    else if (pathNameMatchPage("/github/license")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'LICENSE.md'); });
    }

    else if (pathNameMatchPage("/github/code_of_conduct")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'CODE_OF_CONDUCT.md'); });
    }

    else if (pathNameMatchPage("/cours/readme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'note/README.md'); });
    }

    else if (pathNameMatchPage("/cours/markdown")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'note/Github/Markdown/Learning.md'); });
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

    else {
        await includes();

        await include_css("/src/css/404.css");
        await include_html("/src/html/content/404.html", "content", true);
        console.warn("Erreur : 404");

        if (pathNameMatchPage("404")) {
            await include_html("/src/html/content/404-custom.html", "erreur", true);
        }
    }

    if (!devMode()) {
        await include_script("/src/js/viewcount.js");
    }

    await include_script("/src/js/cursor.js"); //must be last for handler a & btn, buggy with long loading scheme async
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
    if (localStorage.getItem('devMode') == true) {
        return true;
    }
    else {
        return false;
    }
}

async function devTest() {
    console.log("Dev mode ON : " + window.location.hostname);
    /*  
     await include_html("/src/html/include/content.html", "body", false);
     await include_css("/src/css/devTest.css");
     await include_html("/src/html/content/devTest.html", "content", true); 
     */

    await includes();

    await include_script("/src/js/gather.js");
    
    await include_html("/src/html/content/issues.html", "content", true);
    await include_css("/src/css/issues.css");
    await include_script("/src/js/issues.js");
}