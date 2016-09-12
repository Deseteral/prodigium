require('source-map-support').install();

import BookmarksStore from '../src/bookmarks-store';

describe('BookmarksStore', () => {
  let bs;

  beforeEach(() => {
    bs = new BookmarksStore();
  });

  it('should start empty', () => {
    bs.bookmarks.should.be.empty;
  });

  it('should be able to add new site', () => {
    bs.add('youtube.com');

    bs.bookmarks.should.have.members([
      'youtube.com'
    ]);
  });

  it('should be able to add new sites', () => {
    bs.add('youtube.com');
    bs.add('google.com');
    bs.add('reddit.com');

    bs.bookmarks.should.have.members([
      'youtube.com',
      'google.com',
      'reddit.com'
    ]);
  });

  it('should be able to remove site', () => {
    bs.add('youtube.com');
    bs.add('google.com');
    bs.add('reddit.com');

    bs.remove('google.com');

    bs.bookmarks.length.should.equal(2);
    bs.bookmarks.should.have.members([
      'youtube.com',
      'reddit.com'
    ]);
  });
});
