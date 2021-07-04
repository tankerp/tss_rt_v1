import React, { useState, useEffect, useRef } from "react"
import ComponentFinder from "../apis/ComponentFinder"
import Header from "./../Components/Header"
import { CSVDownloader } from "react-papaparse"
//import { useForm } from "react-hook-form"
import "./../Components/Accordion.css"
import Chevron from "./../Components/Chevron"
import "./Reports.css"
//https://preview.npmjs.com/package/react-papaparse
const Reports = () => {
  const [reportData, setReportData] = useState([])
  const [errreportData, setErrReportData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //Accordion functionality/////////////////////////////////
  const [setActive_sum, setActiveState_sum] = useState("")
  const [setHeight_sum, setHeightState_sum] = useState("0px")
  const [setRotate_sum, setRotateState_sum] = useState("accordion__icon")
  const [setActive_err, setActiveState_err] = useState("")
  const [setHeight_err, setHeightState_err] = useState("0px")
  const [setRotate_err, setRotateState_err] = useState("accordion__icon")
  const content = useRef(null)
  function toggleAccordion_sum() {
    setActiveState_sum(setActive_sum === "" ? "active" : "")
    setHeightState_sum(setActive_sum === "active" ? "0px" : `${content.current.scrollHeight + 60}px`)
    setRotateState_sum(setActive_sum === "active" ? "accordion__icon" : "accordion__icon rotate")
  }
  function toggleAccordion_err() {
    setActiveState_err(setActive_err === "" ? "active" : "")
    setHeightState_err(setActive_err === "active" ? "0px" : `${content.current.scrollHeight + 60}px`)
    setRotateState_err(setActive_err === "active" ? "accordion__icon" : "accordion__icon rotate")
  }

  /*
  5
  */

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result_rep = await ComponentFinder.get(`/reports`)

      //console.log(results.data.data.pt)
      setReportData(result_rep.data.data)
      console.log(result_rep.data.data)
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

  useEffect(() => {
    const fetcherrData = async () => {
      //setIsLoading(true)
      const err_rep = await ComponentFinder.get(`/errorlist`)
      console.log(err_rep.data.data)
      setErrReportData(err_rep.data.data.site)

      //setIsLoading(false)
    }
    fetcherrData()
  }, [])

  /*
  4
  */

  /*6*/

  /*
  3
*/
  const renderDate = () => {
    if (isLoading) {
      return <div>Loading......</div>
    }
    return (
      <>
        <div className="navbar_header">
          <Header></Header>
        </div>
        <div className="Container">
          <div className="accordion__section">
            <button className={`accordion ${setActive_sum}`} onClick={toggleAccordion_sum}>
              <p className="accordion__title">Summary Report </p>
              <Chevron className={`${setRotate_sum}`} width={10} fill={"#777"} />
            </button>
            <div ref={content} style={{ maxHeight: `${setHeight_sum}` }} className="accordian__content">
              <CSVDownloader data={reportData} type="button" filename={"Summary"} bom={true}>
                Download Summary
              </CSVDownloader>
            </div>
            {/*1*/}
          </div>
          <div className="accordion__section">
            <button className={`accordion ${setActive_err}`} onClick={toggleAccordion_err}>
              <p className="accordion__title">Errors Report </p>
              <Chevron className={`${setRotate_err}`} width={10} fill={"#777"} />
            </button>
            <div ref={content} style={{ maxHeight: `${setHeight_err}` }} className="accordian__content">
              <CSVDownloader data={errreportData} type="button" filename={"Errors"} bom={true}>
                Download Error
              </CSVDownloader>
            </div>
          </div>
          <div className="accordion__section">
            <button className={`accordion ${setActive_err}`} onClick={toggleAccordion_err}>
              <p className="accordion__title">Custom Report </p>
              <Chevron className={`${setRotate_err}`} width={10} fill={"#777"} />
            </button>
            <div ref={content} style={{ maxHeight: `${setHeight_err}` }} className="accordian__content">
              Custom reports
            </div>
          </div>
        </div>
      </>
    )
  }
  return renderDate()
}

export default Reports

// extra portions
/////////////////////////1//////////////////////////////////////
/*<div className="form-group form-check">
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              All parameters
            </label>
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              AC power
            </label>
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              Voltage
            </label>
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              Current
            </label>
    </div>*/
///////////////////////////2////////////////////////////////////
/*
        <div className="Container">
          <CharacterDropDown />
        </div>*/
///////////////////////////3///////////////////////////////////////
/*
  function CharacterDropDown() {
    const [reportcolData, setReportcolData] = useState([])

    useEffect(() => {
      const fetchcolumnData = async () => {
        setIsLoading(true)
        const result_col = await ComponentFinder.get(`/reportscol`)
        //console.log(results.data.data.pt)
        setReportcolData(result_col.data.data[0].column_name)
        console.log(result_col.data.data[0].column_name)
        setIsLoading(false)
      }
      fetchcolumnData()
    }, [])
    return (
      <select>
        {reportcolData &&
          reportcolData.map(item => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
    )
  }
*/
///////////////////////////////4////////////////////////////////
/*
function CharacterDropDown() {
    return (
      <select>
        <option value="Temperature">Temperature</option>
        <option value="Current">Current</option>
        <option value="Voltage">Voltage</option>
        <option value="dc power">dc power</option>
        <option value="status">status</option>
      </select>
    )
  }
*/
//////////////////////////////5//////////////////////////////////
/*
  const [activeState, setActiveState] = useState("")
  const [setHeight, setHeightState] = useState("0px")
  const [setRotate, setRotateState] = useState("accordion__icon")
  const content = useRef(null)
  function toggleAccordion() {
    setActiveState(activeState === "" ? "active" : "")
    setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`)
    setRotateState(setActive === "active" ? "accordion__icon" : "accordion__icon rotate")
    console.log(content.current.scrollHeight)
  }
  */

/////////////6/////////////////////////////////////////////
/*
  //https://www.carlrippon.com/drop-down-data-binding-with-react-hooks/

  function CharacterDropDown() {
    const [value, setValue] = React.useState()
    const [items] = useState([
      { label: "Temperature", value: "Temp" },
      { label: "Current", value: "curr" },
      { label: "Voltage", value: "volt" },
      { label: "DC Power", value: "dcpower" },
      { label: "Status", value: "status" }
    ])

    return (
      <select value={value} onChange={e => setValue(e.currentTarget.value)}>
        {items.map(item => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    )
  }
*/
