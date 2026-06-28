const https = require('https');

function scrape(url, label) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      const matches = [...data.matchAll(/\"id\":\"([a-zA-Z0-9\-]{11})\"/g)];
      console.log(label, [...new Set(matches.map(m => m[1]))].slice(0, 10));
    });
  });
}

scrape('https://unsplash.com/s/photos/glencoe-scotland', 'Glencoe');
scrape('https://unsplash.com/s/photos/eilean-donan-castle', 'Castle');
scrape('https://unsplash.com/s/photos/london-eye', 'London Eye');
