export default class BookmarksStore {
  constructor() {
    this.bookmarks = [];
  }

  add(url) {
    this.bookmarks.push(url);
  }

  remove(url) {
    const index = this.bookmarks.indexOf(url);

    if (index !== -1) {
      this.bookmarks.splice(index, 1);
    }
  }
}
