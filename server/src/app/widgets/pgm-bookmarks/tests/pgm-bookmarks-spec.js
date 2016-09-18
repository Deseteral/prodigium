/* global chai */
chai.should();

describe('<pgm-clock>', () => {
  let pgmBookmarks;

  beforeEach(() => {
    document.querySelector('#fixture').create();
    pgmBookmarks = document.querySelector('pgm-bookmarks');
  });

  afterEach(() => {
    document.querySelector('#fixture').restore();
  });
});
