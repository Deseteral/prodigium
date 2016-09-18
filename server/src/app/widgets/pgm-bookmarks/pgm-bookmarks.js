Polymer({
  is: 'pgm-bookmarks',
  properties: {
    bookmarks: Array
  },

  ready() {
    fetch('/bookmarks')
      .then((response) => response.json())
      .then((bookmarks) => {
        this.bookmarks = bookmarks;
      });
  }
});
