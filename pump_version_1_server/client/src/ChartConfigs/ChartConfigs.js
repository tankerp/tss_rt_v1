export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: false,
    lineWeight: 1.5
  },

  animation: {
    duration: 2000
  },
  maintainAspectRatio: false, //maintains chart aspect ratio
  responsive: true,
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "probability"
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 100,
          beginAtZero: false
        },
        gridLines: {
          display: true
        }
      }
    ],
    xAxes: [
      {
        type: "time",
        display: true,
        time: {
          parser: "YYYY-MM-DDTHH:mm:ss",
          tooltipFormat: "HH:mm:ss",
          unit: "day"
        },
        distribution: "series"
      }
    ]
  },
  pan: {
    enabled: true,
    mode: "xy",
    speed: 1,
    threshold: 1
  },
  zoom: {
    enabled: true,
    drag: false,
    mode: "xy",
    limits: {
      max: 1,
      min: 0.5
    }
  }
}
