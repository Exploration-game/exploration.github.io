
const parseMarkdown = (text) => {
    const toHTML = text

        .replace(/([^!])\[([^\[]+)\]\(([^\)]+)\)/gim, '$1<a href=\"$3\">$2</a>') // <a>
        .replace(/!\[([^\[]+)\]\(([^\)]+)\)/gim, '<img src=\"$2\" alt=\"$1\" />') // <img>
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
        .replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
        .replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
        .replace(/`(.*?)`/gim, '<code>$1</code>') // <code>
        .replace(/-{3,}/gim, '<hr/>') //hr (Decoration line)
        .replace(/\~\~(.*?)\~\~/gim, '<del>$1</del>')// <del>
        .replace(/\n(?:&gt;|\>)\W*(.*)/gim, '<blockquote><p>$1</p></blockquote>') // <blockquote>

        .replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>') // bold text
        .replace(/\*(.*?)\*/gm, '<i>$1</i>') // italic text

        .replace(/\n\s?\*\s*(.*)/gim, '<ul>\n\t<li>$1</li>\n</ul>') // <ul>
        .replace(/\n\s?[0-9]+\.\s*(.*)/gim, '<ol>\n\t<li>$1</li>\n</ol>') // <ol>

        .replace(/(?!>)([a-z0-9 :;|@&+-.éèàç]+)(?![^<]*>|[^>]*<\/)/gim, '<p>$1</p>') // text p balise
        .replace(/[\n]{1}/g, "<br>") //new line 

        .trim();
    return toHTML.trim();
}

async function getMarkdown(url) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    resolve(data);
                    return;
                })
                .catch(error => console.error(error))
        }, 250);
    });
}

(async function (repo, file) {
    var x = await getMarkdown('https://raw.githubusercontent.com/' + repo + "/main/" + file);
    var x2 = parseMarkdown(x);
    var content = document.querySelector("#content");
    var newDiv = document.createElement("div");
    newDiv.id = "markdown";
    newDiv.innerHTML = x2;
    content.appendChild(newDiv);

    var content = document.querySelector("#anchor");
    var link = document.createElement("a");
    link.href = "https://github.com/" + repo + "/edit/main/" + file;
    link.target = "_blank";
    var button = document.createElement("button");
    button.id = "edit-md"
    var image = document.createElement("img");
    image.src = "/assets/svg/edit.svg";
    image.classList = "svg";

    button.appendChild(image);
    link.appendChild(button);
    content.appendChild(link);
})
    ("Ghub-fr/.github", "profile/README.md");  