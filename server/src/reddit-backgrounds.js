import fetch from 'node-fetch';

export default class RedditBackgrounds {
  constructor(subreddits = []) {
    this.backgrounds = [];
    this.subreddits = subreddits;
  }

  fetchBackgrounds() {
    return new Promise((resolve, reject) => {
      const subredditPromises = this.subreddits
        .slice()
        .map((subreddit) => this._fetchBackgroundsFromSubreddit(subreddit));

      Promise.all(subredditPromises)
        .then((values) => {
          let urls = [];

          // Flatten array of arrays
          values.forEach((v) => {
            urls = urls.concat(v);
          });

          this.backgrounds = urls;
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  getRandomBackground() {
    const index = Math.floor(Math.random() * this.backgrounds.length);
    return this.backgrounds[index];
  }

  _fetchBackgroundsFromSubreddit(subreddit) {
    return new Promise((resolve, reject) => {
      const REDDIT_LIMIT = 100;
      const urls = [];

      fetch(`https://reddit.com/r/${subreddit}.json?limit=${REDDIT_LIMIT}`)
        .then((response) => response.json())
        .then((json) => {
          const posts = json.data.children;

          posts.forEach((post) => {
            if (post.data.domain === 'i.imgur.com') {
              urls.push(post.data.url);
            }
          });

          resolve(urls);
        })
        .catch((err) => reject(err));
    });
  }
}
