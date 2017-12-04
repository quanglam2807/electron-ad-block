// https://raw.githubusercontent.com/Jense5/is-ad/master/scripts/build.js

const { AdBlockClient } = require('ad-block/build/Release/ad-block.node');
const path = require('path');
const fs = require('fs-extra');
const download = require('download');

const filterSources = {
  ads: 'https://easylist.to/easylist/easylist.txt',
  privacy: 'https://easylist.to/easylist/easyprivacy.txt',
  annoyance: 'https://easylist.to/easylist/fanboy-annoyance.txt',
  social: 'https://easylist.to/easylist/fanboy-social.txt',
};

const p = Object.keys(filterSources).map((key) => {
  const url = filterSources[key];

  console.log(`Downloading ${url}...`); // eslint-disable-line

  return download(url)
    .then((data) => {
      const client = new AdBlockClient();
      const lines = data.toString('utf8');
      lines.split('\n').map(line => client.parse(line));

      const buffer = client.serialize(64);

      const distPath = path.resolve(__dirname, '..', 'dist');
      const output = path.resolve(distPath, `${key}.buffer`);

      return fs.ensureDir(distPath)
        .then(() => fs.writeFile(output, buffer));
    });
});

Promise.all(p)
  .then(() => console.log('Done')); // eslint-disable-line
