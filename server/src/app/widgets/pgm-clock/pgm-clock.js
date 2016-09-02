Polymer({
  is: 'pgm-clock',
  properties: {
    formattedTime: {
      type: String,
      value: formatTime()
    }
  },

  ready() {
    const CLOCK_REFRESH_INTERVAL = 500;

    setInterval(() => {
      this.formattedTime = formatTime();
    }, CLOCK_REFRESH_INTERVAL);
  }
});

function formatTime() {
  const date = new Date();

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
