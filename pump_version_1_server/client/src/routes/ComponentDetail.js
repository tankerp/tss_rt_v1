import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
//import { componentsContext } from "../context/componentsContext"
import ComponentFinder from "../apis/ComponentFinder"
import Header from "./../Components/Header"
import SiteComponents from "../Components/SiteComponents"
//import { makeStyles } from "@material-ui/core/styles"
import ComponentCharts2 from "../Components/ComponentCharts2"
import "bootstrap/dist/css/bootstrap.min.css"
import { Card } from "react-bootstrap"
import "./ComponentDetail.css"
/*
This page is used to show the charts as well as the instantaneous data
1. ComponentDetail()
2. use the useParams() hook of react-router-dom to save the id of the pump of 
   interest. This is stored in parameter called id.
...
...
... useEffect hook with function fetchData_inst to get instantaneous data
... function instantData() where the siteComponents component is called to 
    display the cards results
    Loading functionality added

*/

const ComponentDetail = () => {
  //useParams hook for router-dom which extracts the value of the pump from URL
  const { id } = useParams()
  //state variable for showing Loading... for instantaneous results
  const [isLoading_inst, setIsLoading_inst] = useState(false)
  //state variable for showing Loading... for chart results
  const [isLoading_chart, setIsLoading_chart] = useState(false)
  //state variable to save instantaneous results to
  const [siteData_inst, setSiteData_inst] = useState([])
  const location = useLocation()
  //https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
  console.log(location.state.sitedata.customer_id)

  //useEffect to load the instantaneous data only
  useEffect(() => {
    const fetchData_inst = async () => {
      setIsLoading_inst(true)
      const results_inst = await ComponentFinder.get(`/indi/${id}`)
      setSiteData_inst(results_inst.data)
      setIsLoading_inst(false)
    }
    fetchData_inst()
  }, [])

  const instantData = () => {
    if (isLoading_inst) {
      return <div>Loading.....</div>
    }
    return (
      <div>
        <SiteComponents data={siteData_inst} />
      </div>
    )
  }

  const chartData = () => {
    if (isLoading_chart) {
      return <div>Loading.....</div>
    }
    return (
      <div>
        <ComponentCharts2 component_id={id} />
      </div>
    )
  }
  return (
    <>
      <div className="navbar_header">
        <Header></Header>
      </div>

      <div className="cards">
        <Card style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title>Project Details</Card.Title>
            <Card.Text>Project No: {location.state.sitedata.project_no}</Card.Text>
            <Card.Text>Pump No: {location.state.sitedata.pump_no}</Card.Text>
            <Card.Text>Customer ID: {location.state.sitedata.customer_id}</Card.Text>
            <Card.Text>State: {location.state.sitedata.state_name}</Card.Text>
            <Card.Text>Developer: {location.state.sitedata.developer_name}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Text>Pump Status: {location.state.sitedata.pump_status}</Card.Text>
            <Card.Text>Generation Today: {location.state.sitedata.generation_today}</Card.Text>
            <Card.Text>Generation Till Date: {location.state.sitedata.generation_till_date}</Card.Text>
            <Card.Text>Discharge Today: {location.state.sitedata.discharge_today}</Card.Text>
            <Card.Text>Discharge Till Date: {location.state.sitedata.discharge_till_date}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>{chartData()}</div>
      <div>{instantData()}</div>
    </>
  )
}

export default ComponentDetail
