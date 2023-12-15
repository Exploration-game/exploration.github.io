console.log("start test RSS");

document.head.textContent = "";
document.body.textContent = "";

// Channel metadata for the RSS feed
baseUrl = "doc.ghub.fr";
const channel = {
    title: "doc.ghub.fr",
    feedUrl: "https://doc.ghub.fr/rss",
    language: "fr",
    image: "https://doc.ghub.fr/assets/icon/icone.png",
    description: "Test description RSS feed for doc.GHub.fr",
}

const linksList = [
    {
        title: "Titleeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        link: "github/test",
        description: "Statistiques",
        publicationDate: "",
        image: "https://doc.ghub.fr/assets/icon/icone.png",
        creator: "",
    },
    {
        title: "Test2",
        link: "github/statistiques",
        description: "Statistiques",
        publicationDate: "",
        image: "https://doc.ghub.fr/assets/icon/icone.png",
        creator: "test",
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


document.body.innerText = rssFeed;

const xhr = new XMLHttpRequest();
xhr.open("GET", "/rss", false);

xhr.responseType = "xml";

xhr.onload = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {

        xhr.send([rssFeed]);
        console.log(xhr.response);
    }
};
