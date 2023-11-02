
const parseMarkdown = (text) => {
    const toHTML = text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
        .replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
        .replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
        .replace(/\*\*(.*)\*\*/gim, '<p><b>$1</b></p>') // bold text
        .replace(/\*(.*)\*/gim, '<i>$1</i>') // italic text

        /*
        //test
        .replace(/([|]) /gim, '') //clean any '|'
        .replace(/([:]) /gim, '') //clean any ':'
        */



        .trim()
        .replace(/\n(?:&gt;|\>)\W*(.*)/gim, '<blockquote><p>$1</p></blockquote>') // <blockquote>
        // A greater-than character '>' preceding any characters.
        .replace(/\n\s?\*\s*(.*)/gim, '<ul>\n\t<li>$1</li>\n</ul>') // <ul>
        .replace(/\n\s?[0-9]+\.\s*(.*)/gim, '<ol>\n\t<li>$1</li>\n</ol>') // <ol>
        .replace(/([^!])\[([^\[]+)\]\(([^\)]+)\)/gim, '$1<a href=\"$3\">$2</a>') // <a>
        // Not starting with an exclamation mark, square brackets surrounding any characters, followed by parenthesis surrounding any characters.
        .replace(/!\[([^\[]+)\]\(([^\)]+)\)/g, '<img src=\"$2\" alt=\"$1\" />') // <img>
        // Starting with an exclamation mark, then followed by square brackets surrounding any characters, followed by parenthesis surrounding any characters.
        .replace(/\~\~(.*?)\~\~/gim, '<del>$1</del>')// <del>
        // Double tilde characters surrounding any characters.
        .replace(/`(.*?)`/gim, '<code>$1</code>') // <code>
        .replace(/-{3,}/gim, '<hr/>') //hr (Decoration line)
        // Starting with at maximum 5 '-'
        .replace(/[\n]{1,}/g, "<br>") //new line
        // Tidy up newlines to condense where more than 1 occurs back to back.
        //console.log(toHTML);


        //                              selector that work to avoid <>                                                             (?!<?\w+>|\/+>|[A-z]+<)
        .replace(/(?!>)([a-z0-9 :;|@&+-.]+)(?![^<]*>|[^>]*<\/)/gim, '<p>$1</p>') // text p balise
        // Any line surrounded by newlines that doesn't start with an HTML tag, asterisk or numeric value with dot following.


        ;
    return toHTML.trim(); // using trim method to remove whitespace
}

/*
From : 
- https://randyperkins2k.medium.com/writing-a-simple-markdown-parser-using-javascript-1f2e9449a558
- https://github.com/g105b/markdown-to-html/blob/master/src/markdown-to-html.js 
*/
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

(async function () {
    var x = await getMarkdown('https://raw.githubusercontent.com/github/.github/main/profile/README.md');
    var x2 = parseMarkdown(x);
    // await include_html(x2, "content", true);
    var content = document.querySelector("#content");
    var newDiv = document.createElement("div");
    newDiv.id = "markdown";
    newDiv.innerHTML = x2;
    content.appendChild(newDiv);
})();

// new line dont cast enought