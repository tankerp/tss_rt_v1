import React, { useState, useEffect, useRef } from "react"
import { useParams, useLocation } from "react-router-dom"
import ComponentFinder from "../apis/ComponentFinder"
import Header from "./../Components/Header"
import "./SitePage.css"
import { CSVDownloader } from "react-papaparse"
import "./Reports.css"
///////////////////////////Material-UI/////////////////
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
//import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Grid } from "@material-ui/core"
import { Button as MuiButton, Select as MuiSelect, MenuItem } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

/////////////echarts//////////////////////////////////////////
import * as echarts from "echarts"
import Optionline from "./../Optionline"
import Optionline2 from "./../Optionline2"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import resizeObserver from "./../utils/resizeObserver"
import moment from "moment"
///Accordion
import "./../Components/Accordion.css"
import Chevron from "./../Components/Chevron"
import "./Reports.css"

const useStyles = makeStyles({
  root: {
    minWidth: 200
  },
  rootcap: {
    width: 375,
    height: 60,
    marginTop: 10
  },
  bigtables: {
    width: 315,
    height: 150,
    marginTop: 10
  },
  biggertables: {
    width: 700,
    height: 305,
    marginTop: 10
  },
  smalltables: {
    width: 375,
    height: 125,
    marginTop: 10
  },
  rootrev: {
    width: 360
  },
  table: {
    minWidth: 275,
    boxShadow: 0,
    borderBottom: 0
  },
  othertable: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  capacitytable: {
    borderBottom: 0,
    fontSize: 14
  },
  buttonspace: {
    marginLeft: 5,
    marginTop: 5,
    width: 105
  },

  buttonspacedate: {
    marginLeft: 25,
    height: 50,
    width: 175
  }
})

function SitePage2() {
  const classes = useStyles()
  //useParams hook for router-dom which extracts the value of the pump from URL
  const { id } = useParams()
  //https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
  const location = useLocation()

  /////////////Reports//////////////
  const [reportData, setReportData] = useState([])
  const [errreportData, setErrReportData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isReportLoading, setIsReportLoading] = useState(false)
  //////////////////////////////////////////////////////////////

  //state variable for showing Loading... for instantaneous results
  const [isLoading_inst, setIsLoading_inst] = useState(false)
  //state variable to save instantaneous results to
  const [siteData_inst, setSiteData_inst] = useState()
  //state variable to save site info to
  const [siteData_info, setSiteData_info] = useState()
  //const [totenergy, setTotenergy] = useState(0)
  //const [todayenergy, setTodayenergy] = useState(0)
  /////////////////////////////////////////////////////////////////////////
  ///////////echarts//////////////////
  /////////////////////https://vasconez.dev/posts/1 for echarts///////////
  const [siteData_chart, setSiteData_chart] = useState()
  const [siteData_chart2, setSiteData_chart2] = useState()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(moment().add(1, "days")) //useState(new Date() + 1)
  //dates for second chart of current_energy vs irradiation
  //const [siteData_chart2, setSiteData_chart2] = useState()
  const [startDate2, setStartDate2] = useState(new Date())
  const [endDate2, setEndDate2] = useState(moment().add(1, "days")) //useState(new Date() + 1)
  const [startDate3, setStartDate3] = useState(new Date())
  const [endDate3, setEndDate3] = useState(moment().add(1, "days")) //useState(new Date() + 1)
  //console.log(endDate)
  const [paramvalue, setParamValue] = useState(1)
  const [paramitems] = useState([
    { label: "Current", value: 1 },
    { label: "Voltage", value: 2 },
    { label: "Energy", value: 3 },
    { label: "Temperature", value: 4 },
    { label: "Pump On", value: 5 },
    { label: "Short Circuit", value: 6 },
    { label: "Excess Temperature", value: 7 },
    { label: "Fan On", value: 8 },
    { label: "No Load Run", value: 9 },
    { label: "Discharge", value: 10 }
  ])

  const roundofffunc = value => {
    return Math.round(value * 100) / 100
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const datadate = { endingDate: moment(endDate2).format("YYYY-MM-DD"), startingDate: moment(startDate2).format("YYYY-MM-DD") }
      const results_report_submit = await ComponentFinder.get(`/reportdata/${id}`, { params: datadate })
      console.log(results_report_submit.data.data)
      setReportData(results_report_submit.data.data)
      setIsLoading(false)
    }
    fetchData()
    /*
    const fetcherrData = async () => {
      //setIsLoading(true)
      const err_rep = await ComponentFinder.get(`/errorlist`)
      console.log(err_rep.data.data)
      setErrReportData(err_rep.data.data.site)

      //setIsLoading(false)
    }
    fetcherrData()*/
  }, [])

  const handleSubmit2 = async event => {
    event.preventDefault()
    const datadate = { endingDate: moment(endDate2).format("YYYY-MM-DD"), startingDate: moment(startDate2).format("YYYY-MM-DD") }
    try {
      const results_report_submit = await ComponentFinder.get(`/reportdata/${id}`, { params: datadate })
      console.log(results_report_submit.data.data)
      setReportData(results_report_submit.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const dataforreport = async event => {
    event.preventDefault()
    const datadate = { endingDate: moment(endDate2).format("YYYY-MM-DD"), startingDate: moment(startDate2).format("YYYY-MM-DD") }
    try {
      const results_report_submit = await ComponentFinder.get(`/reportdata/${id}`, { params: datadate })
      console.log(results_report_submit.data.data) //
      setReportData(results_report_submit.data.data)
      return reportData
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData_chart = async () => {
      //setIsLoading_chart(true)
      const datadate = { endingDate: moment(endDate).format("YYYY-MM-DD"), startingDate: moment(startDate).format("YYYY-MM-DD") }
      const results_chart = await ComponentFinder.get(`/chartdata/${id}`, { params: datadate })
      setSiteData_chart(results_chart.data.data.resquery.rows)
      //setSiteData_chart2(results_chart.data.data.resquery2.rows)
      console.log(results_chart)
      //setIsLoading_chart(false)
    }
    fetchData_chart()
  }, []) //[], timeFormat

  useEffect(() => {
    const fetchData_chart = async () => {
      //setIsLoading_chart(true)
      const datadate = { endingDate: moment(endDate3).format("YYYY-MM-DD"), startingDate: moment(startDate3).format("YYYY-MM-DD") }
      const results_chart2 = await ComponentFinder.get(`/chartdata2/${id}`, { params: datadate })
      setSiteData_chart2(results_chart2.data.data.resquery.rows)
      //setSiteData_chart2(results_chart.data.data.resquery2.rows)
      console.log(results_chart2)
      //setIsLoading_chart(false)
    }
    fetchData_chart()
  }, []) //[], timeFormat

  const myChart = useRef(null)
  useEffect(() => {
    if (myChart && myChart.current) {
      const chart = echarts.init(myChart.current)
      //console.log(formatData_charts(siteData_chart))
      chart.setOption(Optionline(formatData_charts(siteData_chart), paramvalue))
      if (resizeObserver) resizeObserver.observe(myChart.current)
    }
    //console.log("Chart")
  }, [[], Optionline, resizeObserver, paramvalue]) //, timeFormat

  const myChart2 = useRef(null)
  useEffect(() => {
    if (myChart2 && myChart2.current) {
      const chart2 = echarts.init(myChart2.current)
      //console.log(formatData_charts(siteData_chart))
      chart2.setOption(Optionline2(formatData_charts2(siteData_chart2)))
      if (resizeObserver) resizeObserver.observe(myChart2.current)
    }
    //console.log("Chart")
  }, [[], Optionline2, resizeObserver, siteData_chart2]) //, timeFormat

  const formatData_charts = data => {
    //setParav(para_dropdown)
    //console.log(paramvalue)
    //const data = datas.datafirst.rows//

    if (paramvalue == 1) {
      //date-dcpower
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.rms_current
        }
      })
    } else if (paramvalue == 2) {
      //date-energy
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.rms_voltage
        }
      })
    } else if (paramvalue == 3) {
      //date-irradiation
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.panel_energy
        }
      })
    } else if (paramvalue == 4) {
      //date-current
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.temperature
        }
      })
    } else if (paramvalue == 5) {
      //date-current
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.pump_on
        }
      })
    } else if (paramvalue == 6) {
      //date-current
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.short_circuit
        }
      })
    } else if (paramvalue == 7) {
      //date-current
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.excess_temperature
        }
      })
    } else if (paramvalue == 8) {
      //date-current
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.fan_on
        }
      })
    } else if (paramvalue == 9) {
      //date-current
      return data.map(el => {
        return {
          t: el.datetime2,
          y: el.no_load_run
        }
      })
    } else {
      return data.map(el => {
        //date-voltage
        return {
          t: el.datetime2,
          y: el.discharge
        }
      })
    }
  }

  const formatData_charts2 = data => {
    return data.map(el => {
      return {
        t: el.datetime2,
        y: el.rms_voltage,
        z: el.rms_current,
        x: el.discharge
      }
    })
  }

  const handleSubmit3 = async event => {
    event.preventDefault()
    const datadate = { endingDate: moment(endDate3).format("YYYY-MM-DD"), startingDate: moment(startDate3).format("YYYY-MM-DD") }
    try {
      const results_chart_submit = await ComponentFinder.get(`/chartdata2/${id}`, { params: datadate })
      console.log(results_chart_submit.data.data)
      setSiteData_chart2(results_chart_submit.data.data.resquery.rows)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const datadate = { endingDate: moment(endDate).format("YYYY-MM-DD"), startingDate: moment(startDate).format("YYYY-MM-DD") }
    try {
      const results_chart_submit = await ComponentFinder.get(`/chartdata/${id}`, { params: datadate })
      console.log(results_chart_submit.data.data)
      setSiteData_chart(results_chart_submit.data.data.resquery.rows)
    } catch (err) {
      console.log(err)
    }
    //console.log(datadate.startingDate, datadate.endingDate)
    //console.log(results_chart.data.data) //.datafirst.rows
    // *works* - setSiteData_chart(determineTimeFormat(results_chart.data.data))
    //setSiteData_chart(determineTimeFormat(results_chart.data.data))
  }

  useEffect(() => {
    const fetchData_site = async () => {
      //setIsLoading_chart(true)
      const results_site = await ComponentFinder.get(`/site/${id}`)
      setSiteData_inst(results_site.data.data.site_instant)
      setSiteData_info(results_site.data.data.site_info)

      //setTotenergy(results_site.data.data.totalenergy)
      console.log(results_site.data.data) //.site_info.ac_current
      //setIsLoading_chart(false)
    }
    fetchData_site()
  }, [])

  const chartdatadisp = () => {
    if (!siteData_chart || isLoading) {
      return <div>Loading....</div>
    }
    return (
      <>
        <div style={{ height: 50 }}></div>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker disableToolbar className={classes.buttonspacedate} variant="inline" inputVariant="outlined" label="startdate" format="MM/dd/yyyy" value={startDate} onChange={date => setStartDate(date)} />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker disableToolbar className={classes.buttonspacedate} variant="inline" inputVariant="outlined" label="enddate" format="MM/dd/yyyy" value={endDate} onChange={date => setEndDate(date)} />
        </MuiPickersUtilsProvider>

        <MuiButton className={classes.buttonspace} variant="contained" size="large" color="primary" onClick={handleSubmit} classes={{ root: classes.root, label: classes.label }}>
          Submit
        </MuiButton>
        <div style={{ height: 15 }}></div>
        <select className="dropdown" value={paramvalue} onChange={e => setParamValue(e.currentTarget.value)}>
          {paramitems.map(paramitem => (
            <option key={paramitem.label} value={paramitem.value}>
              {paramitem.label}
            </option>
          ))}
        </select>

        <div ref={myChart} style={{ width: "100%", height: 400 }}></div>
      </>
    )
  }

  const reportdatadisp = () => {
    if (isLoading) {
      return <div>Loading....</div>
    }
    return (
      <>
        <div>
          <h3>Download Reports on the Go </h3>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar className={classes.buttonspacedate} variant="inline" inputVariant="outlined" label="startdate" format="MM/dd/yyyy" value={startDate2} onChange={date => setStartDate2(date)} />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar className={classes.buttonspacedate} variant="inline" inputVariant="outlined" label="enddate" format="MM/dd/yyyy" value={endDate2} onChange={date => setEndDate2(date)} />
          </MuiPickersUtilsProvider>
          <MuiButton className={classes.buttonspace} variant="contained" size="large" color="primary" onClick={handleSubmit2} classes={{ root: classes.root, label: classes.label }}>
            Submit
          </MuiButton>
          {/* <CSVDownloader data={reportData} type="button" filename={"Summary"} bom={true}>
            Download Summary
          </CSVDownloader>*/}
          <CSVDownloader style={{ marginLeft: 25 }} data={reportData} type="button" filename={"Summary"} bom={true}>
            Download Report
          </CSVDownloader>
        </div>
      </>
    )
  }

  const chartdatadisp2 = () => {
    if (!siteData_chart2 || isLoading) {
      return <div>Loading....</div>
    }
    return (
      <>
        <div style={{ height: 50 }}></div>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker disableToolbar className={classes.buttonspacedate} variant="inline" inputVariant="outlined" label="startdate" format="MM/dd/yyyy" value={startDate3} onChange={date => setStartDate3(date)} />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker disableToolbar className={classes.buttonspacedate} variant="inline" inputVariant="outlined" label="enddate" format="MM/dd/yyyy" value={endDate3} onChange={date => setEndDate3(date)} />
        </MuiPickersUtilsProvider>
        <MuiButton className={classes.buttonspace} variant="contained" size="large" color="primary" onClick={handleSubmit3} classes={{ root: classes.root, label: classes.label }}>
          Submit
        </MuiButton>
        <div style={{ height: 55 }}></div>
        <div ref={myChart2} style={{ width: "100%", height: 400 }}></div>
      </>
    )
  }

  const instantData = () => {
    if (!siteData_inst || !siteData_info) {
      return <div>Loading....</div>
    }
    return (
      <>
        <div className="page-width" style={{ height: 25 }}></div>
        <div className="page-width">
          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Project Details
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Project Number
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.project_no}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Pump Number
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.pump_no}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Project State
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.project_state}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Customer/Developer Details
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Customer ID
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.customer_id}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Developer
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.developer_name}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Commision Date
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.commision_date}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Pump Details
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Pump Model
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.pump_model}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Pump Type
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.pump_type}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Pump Rating
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.pump_rating + " HP"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Controller/Hardware
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          PV module manufacturer
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.pv_module}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Inverter
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.inverter}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Controller
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_info.controller}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </div>

        <div className="page-width" style={{ height: 50 }}></div>

        <div className="page-width">
          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Instantaneous data
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          RMS Voltage
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {roundofffunc(siteData_inst.rms_voltage).toString() + " V"}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          RMS Current
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {roundofffunc(siteData_inst.rms_current).toString() + " A"}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Temperature
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_inst.temperature.toString() + " C"}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Pump Status
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_inst.pump_on == 1 ? "ON" : "OFF"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Energy
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Panel Energy
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {/*roundofffunc(siteData_inst.panel_energy).toString() + " kWh"*/}
                          20.9 kWh
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Panel Energy Today
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {roundofffunc(siteData_inst.panel_energy_total / 152).toString() + " kWh"}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Panel Energy Till Date
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {roundofffunc(siteData_inst.panel_energy_total).toString() + " kWh"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Discharge
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Discharge
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {/*roundofffunc(siteData_inst.discharge).toString() + " W/m"*/}
                          2.98 L/min
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Discharge Today
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {/*roundofffunc(siteData_inst.discharge * 12).toString() + " W/m"*/}
                          39.65 L/min
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Discharge Till Date
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {/*roundofffunc(siteData_inst.discharge * 152).toString() + " W/m"*/}
                          2965.78 L/min
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={classes.bigtables}>
              <CardContent>
                <Typography align="left" style={{ fontWeight: 600, fontSize: 16 }}>
                  Pump Errors
                </Typography>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table" borderBottom={0}>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Short Circuit
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_inst.short_circuit == 1 ? "NOT OK" : "OK"}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Excess Temperature
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_inst.excess_temperature == 1 ? "NOT OK" : "OK"}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          Fan ON/OFF
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_inst.fan_on == 1 ? "OK" : "NOT OK"}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 600, fontSize: 12, borderBottom: 0 }}>
                          No Load Run
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: 12, borderBottom: 0 }}>
                          {siteData_inst.no_load_run == 1 ? "NOT OK" : "OK"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="navbar_header">
        <Header></Header>
      </div>
      <div>{instantData()}</div>
      <div className="page-width" style={{ height: 50 }}></div>
      <div className="charts">
        <div className="chart1">{chartdatadisp()}</div>
        <div className="chart2">{chartdatadisp2()}</div>
      </div>
      <div className="page-width" style={{ height: 50 }}></div>
      <div>{reportdatadisp()}</div>
      <div className="page-width" style={{ height: 50 }}></div>
    </>
  )
}

export default SitePage2
