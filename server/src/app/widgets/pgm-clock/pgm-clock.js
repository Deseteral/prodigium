Polymer({
  is: 'pgm-clock',
  properties: {
    formattedTime: String
  },

  ready() {
    this.formattedTime = this._formatTime();

    const CLOCK_REFRESH_INTERVAL = 500;
    setInterval(() => {
      this.formattedTime = this._formatTime();
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

  _getCurrentDate() {
    return new Date();
  }
});
