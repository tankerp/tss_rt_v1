import React from "react"

const Optionline2 = data => {
  //console.log(data)
  if (data) {
    var dateList = data.map(item => {
      return item.t
    })
    var valueLista = data.map(function (item) {
      return item.y
    })
    var valueListb = data.map(function (item) {
      return item.z
    })
    var valueListc = data.map(function (item) {
      return item.x
    })
    //console.log(dateList)
  }

  return {
    title: {
      text: " "
    },
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "20%"]
      }
    },
    grid: {
      right: "25%"
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        restore: { show: true },
        saveAsImage: { show: true },
        dataView: { show: true, readOnly: false }
      }
    },
    legend: {
      data: ["Voltage", "Current", "Discharge"]
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
    yAxis: [
      {
        type: "value",
        name: "Current",
        position: "left",
        axisLine: {
          show: true
        },
        axisLabel: { formatter: "{value} A" }
      },
      {
        type: "value",
        name: "Voltage",
        position: "right",
        axisLine: {
          show: true
        },
        axisLabel: { formatter: "{value} V" }
      },

      {
        type: "value",
        name: "Discharge",
        position: "right",
        offset: 70,
        axisLine: {
          show: true
        },
        axisLabel: { formatter: "{value} W/m" }
      }
    ],
    series: [
      {
        name: "Voltage", //"voltage",
        type: "line",
        yAxisIndex: 1,
        data: valueLista
        //smooth: true
      },
      {
        name: "Current", //"voltage",
        type: "line",
        data: valueListb
        //smooth: true
      },
      {
        name: "Discharge", //"voltage",
        type: "line",
        yAxisIndex: 2,
        data: valueListc
        //smooth: true
      }
    ]
  }
}
export default Optionline2
