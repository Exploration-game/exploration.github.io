const resultsBox = document.getElementById("result-box");
resultsBox.style.display = "none"

const links = [
    {
        href: "/statistiques",
        text: "Statistiques",
    },
    {
        href: "https://discord.gg/rF25kjuv4v",
        text: "Serveur Discord",
    },
    {
        href: "https://ghub.fr",
        text: "Serveur Minecraft",
    },
    {
        href: "/settings",
        text: "Paramètres",
    },
    {
        href: "/contribuer",
        text: "Comment contribuer ?",
    },
    {
        href: "/support",
        text: "Support d'aide",
    },
    {
        href: "/security",
        text: "Security",
    },
    {
        href: "/license",
        text: "License Apache",
    },
    {
        href: "/code_of_conduct",
        text: "Code de conduite",
    },
];

function keyup() {
    let result = [];
    const inputBox = document.getElementById("input-box");
    let input = inputBox.value;

    result = links.filter((link) => {
        return link.text.toLowerCase().includes(input.toLowerCase());
    });

    display(result);
}

function display(result) {
    const resultsBox = document.getElementById("result-box");
    if (result.length) {
        const content = result.map((list, index) => {
            const href = list.href;
            return `<li><a href="` + href + `">` + list.text + `</a></li>`;
        });
        resultsBox.innerHTML = `<ul>` + content.join() + `</ul>`;
        resultsBox.style.display = "block"
    } else {
        resultsBox.style.display = "none"
    }
}