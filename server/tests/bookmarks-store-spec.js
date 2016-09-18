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
    const expectedUrl = 'http://youtube.com';
    const res = bs.add(expectedUrl);

    bs.bookmarks.should.have.deep.members([
      { url: expectedUrl }
    ]);

    res.should.eql({
      url: expectedUrl
    });
  });

  it('should be able to add new sites', () => {
    bs.add('http://youtube.com');
    bs.add('http://google.com');
    bs.add('http://reddit.com');

    bs.bookmarks.should.have.deep.members([
      { url: 'http://youtube.com' },
      { url: 'http://google.com' },
      { url: 'http://reddit.com' }
    ]);
  });

  it('should find site by url', () => {
    bs.add('http://youtube.com');
    bs.add('http://google.com');
    const res = bs.find('http://youtube.com');

    res.should.eql({
      url: 'http://youtube.com'
    });
  });

  it('should not add new site when it is already in store', () => {
    const doubledUrl = 'http://youtube.com';
    bs.add(doubledUrl);
    const res = bs.add(doubledUrl);

    bs.bookmarks.should.have.deep.members([
      { url: doubledUrl }
    ]);

    res.should.eql({
      error: 'ALREADY_IN_STORE'
    });
  });

  it('should be able to remove site', () => {
    bs.add('http://youtube.com');
    bs.add('http://google.com');
    bs.add('http://reddit.com');

    bs.remove('http://google.com');

    bs.bookmarks.length.should.equal(2);
    bs.bookmarks.should.have.deep.members([
      { url: 'http://youtube.com' },
      { url: 'http://reddit.com' }
    ]);
  });
});
