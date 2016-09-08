export default class RedditBackgrounds {
  constructor(subreddits = []) {
    this.backgrounds = [];
    this.subreddits = subreddits;
  }

  getRandomBackground() {
    const index = Math.floor(Math.random() * this.backgrounds.length);
    return this.backgrounds[index];
  }
}
