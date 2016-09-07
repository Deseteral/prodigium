Polymer({
  is: 'pgm-clock',
  properties: {
    formattedTime: String
  },

  ready() {
    this.formattedTime = this.formatTime();

    const CLOCK_REFRESH_INTERVAL = 500;
    setInterval(() => {
      this.formattedTime = this.formatTime();
    }, CLOCK_REFRESH_INTERVAL);
  },

  _getCurrentDate() {
    return new Date();
  },

  formatTime() {
    const date = this._getCurrentDate();

    let time = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ];

    time = time
      .map((t) => t.toString())
      .map((t) => {
        if (t.length !== 2) {
          return '0' + t;
        }
        return t;
      });

    return `${time[0]}:${time[1]}:${time[2]}`;
  }
});
