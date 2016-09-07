/* global chai, sinon */
chai.should();

describe('<pgm-clock>', () => {
  let pgmClock;

  beforeEach(() => {
    document.querySelector('#fixture').create();
    pgmClock = document.querySelector('pgm-clock');

    const fakeCurrentDate = new Date(2016, 8, 6, 23, 47, 12);
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
    time.should.equal('23:47:12');
  });

  it('should correctly format date', () => {
    const date = pgmClock._formatDate();
    date.should.equal('Tuesday, 6th September 2016');
  });

  it('should format ordinal numbers correctly', () => {
    const expected = [
      '',
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '10th',
      '11th',
      '12th',
      '13th',
      '14th',
      '15th',
      '16th',
      '17th',
      '18th',
      '19th',
      '20th',
      '21st',
      '22nd',
      '23rd',
      '24th',
      '25th',
      '26th',
      '27th',
      '28th',
      '29th',
      '30th',
      '31st'
    ];

    for (let i = 1; i <= 31; i++) {
      pgmClock._ordinal(i).should.equal(expected[i]);
    }
  });
});
