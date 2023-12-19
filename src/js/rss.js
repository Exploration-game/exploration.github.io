console.log("start test RSS");

function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function buildRFC822Date(dateString) {
  const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const timeStamp = Date.parse(dateString);
  const date = new Date(timeStamp);

  const day = dayStrings[date.getDay()];
  const dayNumber = addLeadingZero(date.getDate());
  const month = monthStrings[date.getMonth()];
  const year = date.getFullYear();
  const time = `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}:00`;

  return `${day}, ${dayNumber} ${month} ${year} ${time}`;
}

// Channel metadata for the RSS feed
baseUrl = "https://doc.ghub.fr";
const channel = {
  title: "doc.ghub.fr",
  feedUrl: "https://doc.ghub.fr/rss.rss",
  language: "fr",
  image: "https://doc.ghub.fr/assets/icon/icone.png",
  description: "Test description RSS feed for doc.GHub.fr",
}

const linksList = [
  {
    title: "Création cours sur le HTML",
    link: "cours/html",
    description: "Début du cours sur le HTML (Date, histoire, syntaxe)",
    publicationDate: buildRFC822Date("2023-12-14T00:00:00.0000"),
    image: "https://doc.ghub.fr/assets/icon/icone.png",
    creator: "GHub",
  },
  {
    title: "Création flux RSS (Bêta)",
    link: "outils/rss",
    description: "Flux RSS",
    publicationDate: buildRFC822Date("2023-12-15T00:00:00.0000"),
    image: "https://doc.ghub.fr/assets/icon/icone.png",
    creator: "GHub",
  },
  {
    title: "Cube & sphère en 3D",
    link: "outils/cube",
    description: "3D",
    publicationDate: buildRFC822Date("2023-12-19T00:00:00.0000"),
    image: "https://doc.ghub.fr/assets/icon/icone.png",
    creator: "GHub & YusukeNakaya",
  },
  {
    title: "Connexion via Discord OAuth",
    link: "discord/login",
    description: "Discord OAuth",
    publicationDate: buildRFC822Date("2023-12-19T00:00:00.0000"),
    image: "https://doc.ghub.fr/assets/icon/icone.png",
    creator: "GHub",
  },
];

const channelImage = channel.image
  ? `<image>
        <title>${channel.title}</title>
        <url>${channel.image}</url>
        <link>${baseUrl}</link>
      </image>`
  : ''

// Filter pages that have RSS enabled and map them to feed items
const feedItems = linksList;

// Generate the channel feed items based on the filtered pages
const channelFeed = feedItems?.map((node) => {
  const link = baseUrl + "/" + node.link;
  console.log("test : " + link)
  const meta = node.meta || {}
  const title = node.title
  const description = node.description
  const publicationDate = node.publicationDate
  const image = node.image
  const creator = node.author || channel.title
  const imageTag = image ? `<img src="${image}" alt="${title || ''}" />` : ''

  return `
      <item>
        <title><![CDATA[${title}]]></title>
        <link>${link}</link>
        <guid isPermaLink="true">${link}</guid>
        ${publicationDate ? `<pubDate>${new Date(publicationDate).toUTCString()}</pubDate>` : ''}
        <dc:creator><![CDATA[${creator}]]></dc:creator>
        ${description ? `<description><![CDATA[${description}]]></description>` : ''}
        ${imageTag ? `<content:encoded><![CDATA[${imageTag}]]></content:encoded>` : ''}
      </item>
    `
}).join('');

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${channel.title}</title>
      <link>${baseUrl}</link>
      <atom:link href="${channel.feedUrl}" rel="self" type="application/rss+xml" />
      ${channel.description ? `<description>${channel.description}</description>` : ''}
      ${channel.updatedAt ? `<lastBuildDate>${new Date(channel.updatedAt).toUTCString()}</lastBuildDate>` : ''}
      <language>${channel.language}</language>
      ${channelImage}
      ${channelFeed}
    </channel>
  </rss>
  `

var div = document.createElement("div");
var textarea = document.createElement("textarea");
textarea.textContent = rssFeed;
textarea.style = "width:70vw;height:50vh;color:var(--text-color);background-color:var(--main-color)";
textarea.spellcheck = false;
div.appendChild(textarea);

var hr = document.createElement("hr");
hr.style = "margin-top:60px;margin-bottom:60px;";
div.appendChild(hr);

var btn = document.createElement("button");
btn.textContent = "Copier le flux RSS";
btn.style = "color:var(--text-color);padding:12px;margin:6px;";
btn.onclick = function () {
  navigator.clipboard.writeText(rssFeed);
}
div.appendChild(btn);

var btn2 = document.createElement("button");
btn2.textContent = "Aller vers RSS.rss";
btn2.style = "color:var(--text-color);padding:12px;margin:6px;";
btn2.onclick = function () {
  window.open("https://doc.ghub.fr/rss.rss");
}
div.appendChild(btn2);

var btn3 = document.createElement("button");
btn3.textContent = "RSS validator";
btn3.style = "color:var(--text-color);padding:12px;margin:6px;";
btn3.onclick = function () {
  window.open("https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fdoc.ghub.fr%2Frss.rss");
}
div.appendChild(btn3);

document.body.querySelector("#content").appendChild(div);