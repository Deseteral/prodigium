/* global chai, sinon */
chai.should();

describe('<pgm-clock>', () => {
  let pgmClock;

  beforeEach(() => {
    document.querySelector('#fixture').create();
    pgmClock = document.querySelector('pgm-clock');

    const fakeCurrentDate = new Date(2016, 9, 6, 23, 47, 12);
    const fakeCurrentDateFunction = sinon.stub();
    fakeCurrentDateFunction.returns(fakeCurrentDate);

    pgmClock._getCurrentDate = fakeCurrentDateFunction;
  });

  afterEach(() => {
    document.querySelector('#fixture').restore();
  });

  it('should display time', () => {
    const time = pgmClock.querySelector('.time').textContent;
    /^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$/.test(time).should.be.true;
  });

  it('should correctly format time', () => {
    const time = pgmClock._formatTime();
    time.should.be.eql('23:47:12');
  });
});
