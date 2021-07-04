import React, { useEffect, useRef, useState } from "react"
import Chartjs from "chart.js"
import { historyOptions } from "../ChartConfigs/ChartConfigs"
import * as Zoom from "chartjs-plugin-zoom"
import ComponentFinder from "../apis/ComponentFinder"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./Charts_peripherals.css"
const ComponentCharts2 = ({ component_id }) => {
  // Reference to dom element in React is done with useRef hook
  // In chartjs example, it is shown that they use a ref??????????????
  const chartRef = useRef()

  //state variable to save chart results to
  const [siteData_chart, setSiteData_chart] = useState([])

  const [startDate, setStartDate] = useState(new Date(2020, 12, 26))
  const [endDate, setEndDate] = useState(new Date(2020, 12, 28))

  const [paramvalue, setParamValue] = useState(1)
  //State hook variable to store developer
  const [paramitems] = useState([
    { label: "DC Power", value: 1 },
    { label: "Temperature", value: 2 },
    { label: "Voltage", value: 3 },
    { label: "Current", value: 4 },
    { label: "AC Power", value: 5 }
  ])

  // function to convert data format from array to object
  // Parameter data here is the passed value of data which in this
  // case is data2 sent at the function initialization as params
  const formatData_charts = data => {
    //setParav(para_dropdown)
    //console.log(paramvalue)
    if (paramvalue == 1) {
      //date-dcpower
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.powerval
        }
      })
    } else if (paramvalue == 2) {
      //date-temperature
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.temperature
        }
      })
    } else if (paramvalue == 3) {
      //date-voltage
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.voltage
        }
      })
    } else if (paramvalue == 4) {
      //date-current
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.currentval
        }
      })
    } else {
      return data.map(el => {
        //date-current
        return {
          t: el.datetime,
          y: el.currentval
        }
      })
    }
  }
  /*
  //useEffect to load the chart data only
  useEffect(() => {
    const fetchData_chart = async () => {
      //setIsLoading_chart(true)
      console.log(startDate)
      console.log(endDate)
      const results_chart = await ComponentFinder.get(`/all/${component_id}`, {
        startDate: startDate,
        endDate: endDate
      })
      setSiteData_chart(results_chart.data.data.rows)
      console.log(results_chart.data.data.rows)
      //setIsLoading_chart(false)
    }
    fetchData_chart()
  }, [])
*/

  //useEffect to load the chart data only
  useEffect(() => {
    const fetchData_chart = async () => {
      //setIsLoading_chart(true)
      const results_chart = await ComponentFinder.get(`/all/${component_id}`)
      setSiteData_chart(results_chart.data.data.rows)
      console.log(results_chart.data.data.rows)
      //setIsLoading_chart(false)
    }
    fetchData_chart()
  }, [])

  useEffect(() => {
    //ensure chartRef is defined and canvas is rendered even before
    //it has a value
    if (chartRef && chartRef.current) {
      const chartInstance = new Chartjs(chartRef.current, {
        //.current to get actual Ref
        type: "line",
        data: {
          //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: paramvalue == 1 ? "DC power" : paramvalue == 2 ? "Temperature" : paramvalue == 3 ? "Voltage" : paramvalue == 4 ? "Current" : "choose parameter from dropdown menu",
              data: formatData_charts(siteData_chart), //arrval,
              fill: false,
              lineTension: 0.3,
              borderColor: "rgba(255,0,0,0.5)",
              backgroundColor: "rgba(255,0,0,0.5)",
              borderWidth: 3,
              pointRadius: 0.01
            }
          ]
        },
        options: {
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
                  labelString: paramvalue == 1 ? "DC power (kW)" : paramvalue == 2 ? "Temperature (C)" : paramvalue == 3 ? "Voltage (V)" : paramvalue == 4 ? "Current (Amp)" : "choose parameter from dropdown menu"
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
      })
    }
  }, [[], paramvalue])

  return (
    <>
      <div className="pickers">
        <DatePicker className="start" selected={startDate} onChange={date => setStartDate(date)} placeholderText="Start Date" />
        <DatePicker className="end" selected={endDate} onChange={date => setEndDate(date)} placeholderText="End Date" />
        <select className="dropdown" value={paramvalue} onChange={e => setParamValue(e.currentTarget.value)}>
          {paramitems.map(paramitem => (
            <option key={paramitem.label} value={paramitem.value}>
              {paramitem.label}
            </option>
          ))}
        </select>
      </div>
      <div>{<canvas ref={chartRef} id="myChart" width={180} height={400}></canvas>}</div>
    </>
  )
}

export default ComponentCharts2
