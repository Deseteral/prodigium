Polymer({
  is: 'pgm-clock',
  properties: {
    formattedTime: String,
    formattedDate: String
  },

  ready() {
    this.formattedTime = this._formatTime();
    this.formattedDate = this._formatDate();

    const CLOCK_REFRESH_INTERVAL = 500;
    setInterval(() => {
      this.formattedTime = this._formatTime();
      this.formattedDate = this._formatDate();
    }, CLOCK_REFRESH_INTERVAL);
  },

  _formatTime() {
    const date = this._getCurrentDate();
    const time = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ];

    return time
      .map((t) => t.toString())
      .map((t) => {
        if (t.length !== 2) {
          return '0' + t;
        }
        return t;
      })
      .reduce((acc, el) => acc + ':' + el);
  },

  _formatDate() {
    const date = this._getCurrentDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const weekDayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
      'Saturday'
    ];

    // eg. 'Tuesday, 6th September 2016'
    return [
      weekDayNames[date.getDay()] + ',',
      this._ordinal(date.getDate()),
      monthNames[date.getMonth()],
      date.getFullYear()
    ].join(' ');
  },

  _getCurrentDate() {
    return new Date();
  },

  _ordinal(number) {
    if (Math.floor(number / 10) === 1) {
      return number + 'th';
    }

    if (number % 10 === 1) {
      return number + 'st';
    }

    if (number % 10 === 2) {
      return number + 'nd';
    }

    if (number % 10 === 3) {
      return number + 'rd';
    }

    return number + 'th';
  }
});
