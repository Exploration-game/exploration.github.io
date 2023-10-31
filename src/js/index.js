index(); async function index() {
    console.info("Loading index");

    await styles();
    await includes();
}

async function includes() {
    console.info("Loading includes");

    await include_html("/src/html/include/header.html", "body", false);
    await include_html("/src/html/include/anchor.html", "body", false);
    await setIconTheme();
    await include_html("/src/html/include/content.html", "body", false);

    await customPage();

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

async function customPage() {
    console.info("Loading custom page");

    await include_html("/src/html/content/welcome.html", "content", true);

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