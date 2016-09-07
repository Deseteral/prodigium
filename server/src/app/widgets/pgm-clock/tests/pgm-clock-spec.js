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
    const time = pgmClock.formatTime();
    time.should.be.eql('23:47:12');
  });
});
