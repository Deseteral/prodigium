/* eslint no-undefined: "off" */
require('source-map-support').install();
import chai from 'chai';
const should = chai.should();

import RedditBackgrounds from '../src/reddit-backgrounds';

describe('RedditBackgrounds', () => {
  it('should start empty', () => {
    const rb = new RedditBackgrounds();

    rb.backgrounds.length.should.equal(0);
    rb.subreddits.length.should.equal(0);
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
});
