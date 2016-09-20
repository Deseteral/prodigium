require('source-map-support').install();

import express from 'express';

import ConfigStore from './config-store';
import router from './router';
import RedditBackgrounds from './reddit-backgrounds';
import BookmarksStore from './bookmarks-store';

// Main entry point
(() => {
  // Load configuration
  const configStore = new ConfigStore();
  configStore.load();

  // Configure the server
  const app = express();
  const redditBackgrounds = new RedditBackgrounds(
    configStore.config.backgrounds.subreddits
  );
  const bookmarksStore = new BookmarksStore(
    configStore.config.bookmarks
  );

  // Server routing
  router(app)
    .staticFiles()
    .setupRoute(
      '/background',
      RedditBackgrounds.getRoute(redditBackgrounds)
    )
    .setupRoute(
      '/bookmarks',
      BookmarksStore.getRoute(bookmarksStore)
    );

  // Setup interval for background fetching
  redditBackgrounds.fetchBackgroundsInInterval(
    configStore.config.backgrounds.refreshInterval
  );

  // Fetch backgrounds and start webserver
  redditBackgrounds.fetchBackgrounds()
    .then(() => {
      const port = configStore.config.port;
      app.listen(port, () =>
        console.log(`Prodigium server running on port ${port}`)
      );
    });
})();
