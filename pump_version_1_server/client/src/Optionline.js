import React from "react"

const Optionline = (data, paramvalue) => {
  //console.log(data)
  if (data) {
    var dateList = data.map(item => {
      return item.t
    })
    var valueList = data.map(function (item) {
      return item.y
    })
    //console.log(dateList)
  }

  return {
    title: {
      text: "Parameter Charts"
    },
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"]
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "inside",
        start: 30,
        end: 50
      },
      {
        start: 0,
        end: 10
      }
    ],
    xAxis: {
      type: "category",
      data: dateList
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"]
    },
    series: [
      {
        name: paramvalue == 1 ? "DC power (KW)" : paramvalue == 2 ? "Energy (kWh)" : paramvalue == 3 ? "Irradiation kWh/m2)" : paramvalue == 4 ? "Current (A)" : "Voltage (V)", //"voltage",
        type: "line",
        data: valueList
        //smooth: true
      }
    ]
  }
}
export default Optionline
