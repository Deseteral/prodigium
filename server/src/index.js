import fs from 'fs';
import nodePath from 'path';
import express from 'express';
import RedditBackgrounds from './reddit-backgrounds';

// Main entry point
(() => {
  // Configure the server
  const config = loadConfig();
  const app = express();
  const redditBackgrounds = new RedditBackgrounds(config.subreddits);

  const BACKGROUND_REFRESH_INTERVAL =
    1000 * 60 * config.backgroundRefreshInterval;

  // Server routing
  app.use('/', express.static(nodePath.join(__dirname, 'app')));
  app.use('/widgets', express.static(nodePath.join(__dirname, 'app/widgets')));
  app.use('/bower_components',
    express.static(nodePath.join(__dirname, 'bower_components'))
  );

  app.get('/background', (req, res) => {
    const url = redditBackgrounds.getRandomBackground();
    res.send(url);
  });

  // Fetch backgrounds and start webserver
  console.log('Fetching background images from reddit...');
  redditBackgrounds.fetchBackgrounds()
    .then(() => {
      handleRedditFetch(redditBackgrounds.backgrounds);

      app.listen(config.port, () =>
        console.log(`Prodigium server running on port ${config.port}`)
      );
    })
    .catch(handleRedditFetchError);

  // Setup interval for background fetching
  setInterval(() => {
    console.log('Fetching background images from reddit...');
    redditBackgrounds.fetchBackgrounds()
      .then(() => handleRedditFetch(redditBackgrounds.backgrounds))
      .catch(handleRedditFetchError);
  }, BACKGROUND_REFRESH_INTERVAL);
})();

function loadConfig() {
  const configFilePath = nodePath.join(__dirname, 'config.json');
  const DEFAULT_CONFIG = {
    port: 3426,
    subreddits: ['earthporn'],
    backgroundRefreshInterval: 30
  };

  if (fileExists(configFilePath)) {
    console.log('Loading config');
    return JSON.parse(fs.readFileSync(configFilePath));
  }

  console.log('Config file doesn\'t exist! Using default config');
  fs.writeFileSync(configFilePath, JSON.stringify(DEFAULT_CONFIG, null, 2));
  return DEFAULT_CONFIG;
}

function fileExists(fullpath) {
  try {
    return fs.statSync(fullpath).isFile();
  } catch (e) {
    return false;
  }
}

function handleRedditFetch(backgrounds) {
  console.log(`Fetched ${backgrounds.length} backgrounds from reddit`);
}

function handleRedditFetchError(err) {
  console.error(err);
  console.error('Failed to fetch reddit backgrounds');
}
