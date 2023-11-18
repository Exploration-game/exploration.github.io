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
}

async function Metadata() {
    document.title = "GHub " + getShortPathname();

    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = "/assets/icon/icone.png";
    document.head.appendChild(link);
}

async function pages() {
    console.info("Loading custom page");

    if (pathNameMatchPage("") || pathNameMatchPage("index")) {
        await includes();
        if (devMode()) {
            devTest();
        } else {
            await include_html("/src/html/content/welcome.html", "content", true);
            await include_css("/src/css/welcome.css");
        }
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
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'profile/README.md'); });
    }

    else if (pathNameMatchPage("contribuer")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'CONTRIBUTING.md'); });
    }

    else if (pathNameMatchPage("notereadme")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'note/README.md'); });
    }

    else if (pathNameMatchPage("markdownlearning")) {
        await includes();
        await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'note/Github/Markdown/Learning.md'); });
    }

    else if (pathNameMatchPage("settings")) {
        await includes();

        await include_css("/src/css/settings.css");
        await include_html("/src/html/content/settings.html", "content", true);
        await include_script("/src/js/settings.js");
    }

    else {
        await includes();

        await include_css("/src/css/404.css");
        await include_html("/src/html/content/404.html", "content", true);

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
    path = path.replaceAll("/", "");
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
    else {
        return false;
    }
}

async function devTest() {
    await include_script("/src/js/markdown.js").then(() => { addMarkdown('GHub-fr/.github', 'note/Github/Markdown/Learning.md'); });
    console.log("Dev mode ON : " + window.location.hostname);
    await include_css("/src/css/devTest.css");
    await include_html("/src/html/content/devTest.html", "content", true);

    const inputBox = document.getElementById("input-box");
    const resultsBox = document.getElementById("result-box");
    resultsBox.style.display = "none"

    const links = [
        {
            href: "/faqs",
            text: "Frequently asked questions",
        },
        {
            href: "/article",
            text: "Article",
        },
        {
            href: "/contact",
            text: "Contact",
        },
        {
            href: "https://discord.gg/abc",
            text: "Discord",
        },
    ];

    inputBox.onkeyup = function () {
        let result = [];
        let input = inputBox.value;
        if (input.length) {
            result = links.filter((link) => {
                return link.text.toLowerCase().includes(input.toLowerCase());
            });
        }
        display(result);
    }

    function display(result) {
        if (result.length) {
            const content = result.map((list, index) => {
                const href = list.href;
                return `<li><a href="${href}">${list.text}</a></li>`;
            });
            resultsBox.innerHTML = `<ul>${content.join('')}</ul>`;
            resultsBox.style.display = "block"
        } else {
            resultsBox.innerHTML = '';
            resultsBox.style.display = "none"
        }
    }
}