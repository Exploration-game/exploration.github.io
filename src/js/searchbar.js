const resultsBox = document.getElementById("result-box");
resultsBox.style.display = "none"

const links = [
    {
        href: "/github/statistiques",
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
        href: "/github/contribuer",
        text: "Comment contribuer ?",
    },
    {
        href: "/github/support",
        text: "Support d'aide",
    },
    {
        href: "/github/security",
        text: "Security",
    },
    {
        href: "/github/license",
        text: "License Apache",
    },
    {
        href: "/github/code_of_conduct",
        text: "Code de conduite",
    },
    {
        href: "/outils/matrice",
        text: "Matrice / Matrix",
    },
    {
        href: "/outils/cube",
        text: "Cube & Sphère (Sphere) 3D",
    },
    {
        href: "/discord/login",
        text: "Exemple de Discord login Tools [WIP]",
    },
    {
        href: "/outils/rss",
        text: "Flux RSS",
    },
    {
        href: "/outils/caesar",
        text: "Chiffrement par décalage (Caesar / César)",
    },
    {
        href: "/cours/html",
        text: "Cours sur le HTML",
    },
    {
        href: "/cours/css",
        text: "Cours sur le CSS",
    },
    {
        href: "/cours/js",
        text: "Cours sur le JavaScript (JS)",
    },
    {
        href: "/admin/contact",
        text: "Contacter l'administrateur du projet",
    },
    {
        href: "/admin/film",
        text: "Les films conseillés par GHub",
    },
    {
        href: "/admin/music",
        text: "Musiques conseillés par GHub (Music)",
    },
];

function keyup() {
    let result = [];
    const inputBox = document.getElementById("input-box");
    let input = inputBox.value;

    if (input.length > 0) {
        result = links.filter((link) => {
            return link.text.toLowerCase().includes(input.toLowerCase());
        });
    }

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