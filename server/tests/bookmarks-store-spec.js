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
    const res = bs.add('youtube.com');

    bs.bookmarks.should.have.deep.members([
      { url: 'youtube.com' }
    ]);

    res.should.eql({
      url: 'youtube.com'
    });
  });

  it('should be able to add new sites', () => {
    bs.add('youtube.com');
    bs.add('google.com');
    bs.add('reddit.com');

    bs.bookmarks.should.have.deep.members([
      { url: 'youtube.com' },
      { url: 'google.com' },
      { url: 'reddit.com' }
    ]);
  });

  it('should find site by url', () => {
    bs.add('youtube.com');
    bs.add('google.com');
    const res = bs.find('youtube.com');

    res.should.eql({
      url: 'youtube.com'
    });
  });

  it('should not add new site when it is already in store', () => {
    bs.add('youtube.com');
    const res = bs.add('youtube.com');

    bs.bookmarks.should.have.deep.members([
      { url: 'youtube.com' }
    ]);

    res.should.eql({
      error: 'ALREADY_IN_STORE'
    });
  });

  it('should be able to remove site', () => {
    bs.add('youtube.com');
    bs.add('google.com');
    bs.add('reddit.com');

    bs.remove('google.com');

    bs.bookmarks.length.should.equal(2);
    bs.bookmarks.should.have.deep.members([
      { url: 'youtube.com' },
      { url: 'reddit.com' }
    ]);
  });
});
