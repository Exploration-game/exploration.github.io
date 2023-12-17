
const parseMarkdown = (text) => {
    const toHTML = text

        .replace(/([^!])\[([^\[]+)\]\(([^\)]+)\)/gim, '$1<a href=\"$3\">$2</a>') // <a>
        .replace(/!\[([^\[]+)\]\(([^\)]+)\)/gim, '<img src=\"$2\" alt=\"$1\" />') // <img>
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
        .replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
        .replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
        .replace(/\`{1,3}(.*?)\`{1,3}/gms, '<code>$1</code>') // <code>
        .replace(/-{3,}/gim, '<hr/>') //hr (Decoration line)
        .replace(/\~\~(.*?)\~\~/gim, '<del>$1</del>')// <del>
        .replace(/\n(?:&gt;|\>)\W*(.*)/gim, '<blockquote><p>$1</p></blockquote>') // <blockquote>

        .replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>') // bold text
        .replace(/\*(.*?)\*/gm, '<i>$1</i>') // italic text
        .replace(/\_\_(.*?)\_\_/gm, '<u>$1</u>') // underline

        .replace(/\n\s?\*\s*(.*)/gim, '<ul>\n\t<li>$1</li>\n</ul>') // <ul>
        .replace(/\n\s?[0-9]+\.\s*(.*)/gim, '<ol>\n\t<li>$1</li>\n</ol>') // <ol>

        .replace(/(?!>)([a-z0-9 :;|!§%'’"°«»(){}@&=+-/^_¨$£¤µ*€.,âôœûùéêëèàç/]+)(?![^<]*>|[^>]*<\/)/gim, '<p>$1</p>') // text p balise
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

async function addMarkdown(repo, file) {
    var x = await getMarkdown('https://raw.githubusercontent.com/' + repo + "/main/" + file);
    var x2 = parseMarkdown(x);
    var content = document.querySelector("#content");

    var newDiv = document.createElement("div");
    newDiv.id = "markdown";
    newDiv.innerHTML = x2;

    var anchorList = document.createElement("div");
    anchorList.style = "padding:16px;display:grid;border-style:solid;border-width:1px;border-color:var(--text-color);border-radius:16px;background-color:var(--main-color);";
    content.appendChild(anchorList);

    var anchorTitle = document.createElement("b");
    anchorTitle.textContent = "Sommaire :"
    anchorList.appendChild(anchorTitle);

    content.appendChild(newDiv);


    //edit ancre
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

    //chapter ancre
    var childDivs = document.getElementById('markdown').getElementsByTagName('h1');

    for (i = 0; i < childDivs.length; i++) {
        var childDiv = childDivs[i];
        var textPre = childDiv.textContent;
        var text = textPre.replaceAll(" ", "_");
        var anchor = document.createElement("a");
        anchor.href = "#" + text;
        anchor.id = text;
        anchor.textContent = "#";
        anchor.style = "padding-left:12px;";
        childDiv.append(anchor);

        var anchorOnList = document.createElement("a");
        anchorOnList.href = "#" + text;
        anchorOnList.textContent = textPre;
        anchorList.appendChild(anchorOnList);
    }
}