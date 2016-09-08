/* eslint no-undefined: "off" */
require('source-map-support').install();
import chai from 'chai';
import nock from 'nock';
const should = chai.should();

import RedditBackgrounds from '../src/reddit-backgrounds';

const earthpornFixture = require('./fixtures/earthporn.json');

describe('RedditBackgrounds', () => {
  it('should start empty', () => {
    const rb = new RedditBackgrounds();

    rb.backgrounds.should.be.empty;
    rb.subreddits.should.be.empty;
  });

  describe('getRandomBackground', () => {
    it('should return undefined when there are no backgrounds', () => {
      const rb = new RedditBackgrounds();
      should.equal(rb.getRandomBackground(), undefined);
    });

    it('should return random background', () => {
      const fakeUrls = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7'];
      const rb = new RedditBackgrounds();
      rb.backgrounds = fakeUrls;

      rb.getRandomBackground().should.be.oneOf(fakeUrls);
    });
  });

  it('should fetch backgrounds from single subreddit', () => {
    nock('https://reddit.com')
      .get(/\/r\/earthporn.*/)
      .reply(200, earthpornFixture);

    const rb = new RedditBackgrounds(['earthporn']);

    return rb.fetchBackgrounds()
      .then(() => {
        rb.backgrounds.should.have.members([
          'http://i.imgur.com/u6BJXSN.jpg',
          'http://i.imgur.com/DnrCg8F.jpg',
          'http://i.imgur.com/ynT5tO8.jpg'
        ]);
      });
  });
});
