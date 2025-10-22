const axios = require('axios');
const xml2js = require('xml2js');

const RSS_URL = 'https://nsearchives.nseindia.com/content/RSS/Online_announcements.xml';

async function fetchRSS() {
  try {
    const response = await axios.get(RSS_URL);
    const xml = response.data;

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);

    const items = result.rss.channel[0].item;

    console.log(`Fetched ${items.length} items from RSS feed:\n`);

    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title[0]}`);
      console.log(`   Link: ${item.link[0]}\n`);
    });
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error.message);
  }
}

fetchRSS();
