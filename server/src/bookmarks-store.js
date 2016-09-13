export default class BookmarksStore {
  constructor() {
    this.bookmarks = [];
  }

  add(url) {
    const bookmark = { url };

    if (this.find(url)) {
      return { error: 'ALREADY_IN_STORE' };
    }

    this.bookmarks.push(bookmark);
    return bookmark;
  }

  remove(url) {
    const toRemove = this.find(url);
    const index = this.bookmarks.indexOf(toRemove);

    if (index !== -1) {
      this.bookmarks.splice(index, 1);
    }
  }

  find(url) {
    return this.bookmarks.find(
      (bookmark) => bookmark.url === url
    );
  }

  static getRoute(bookmarksStore) {
    const sendBookmarks = (res) =>
      res.send(JSON.stringify(bookmarksStore.bookmarks));

    return {
      get(req, res) {
        sendBookmarks(res);
      },

      put(req, res) {
        const url = req.body;
        bookmarksStore.add(url);

        sendBookmarks(res);
      },

      delete(req, res) {
        const url = req.body;
        bookmarksStore.remove(url);

        sendBookmarks(res);
      }
    };
  }
}
