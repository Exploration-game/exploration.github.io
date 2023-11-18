async function viewCount(page) {
    var pathname = window.location.pathname;
    var pathname = pathname.replaceAll("/", ".");
    var pathname = pathname.replace(".html", "");

    if (pathname === ".") {
        pathname = ".index"
    }

    var content = document.getElementById("content");

    var globalView = await getViews(page);
    var globalText = document.createElement("p");
    globalText.textContent = globalView + " connexions";

    var pageView = await getViews(page + pathname);
    var pageText = document.createElement("p");
    pathname = pathname.replaceAll(".", "");
    pageText.textContent = pathname + " : " + pageView + " vues";

    content.appendChild(globalText);
    content.appendChild(pageText);
}

const getViews = async (repo, callback) => {
    let data = await fetch("https://visit-counter.vercel.app/counter?page=" + repo);
    let value = await data.json();
    return value;
}

viewCount("testgithubpage.io.test2");