import React, { useState, useEffect, useContext } from "react"
import "./Summary_table.css"
import ComponentFinder from "../apis/ComponentFinder"
import { ComponentContext } from "../context/ComponentContext"
import { useHistory } from "react-router-dom"
//import Pagination from "./Pagination"
import ReactPaginate from "react-paginate"

const Summary_table = () => {
  const { sitecomponents, setSiteComponents } = useContext(ComponentContext)
  //State hook variable to store state
  const [statevalue, setStateValue] = useState()
  //State hook variable to store developer
  const [devvalue, setDevValue] = useState()
  const [stateitems] = useState([
    { label: "Karnataka", value: "KA" },
    { label: "Tamil Nadu", value: "TN" },
    { label: "Gujarat", value: "GJ" }
  ])
  const [developeritems] = useState([
    { label: "Select Developer", value: "Liv" },
    { label: "Livint", value: "Liv" },
    { label: "TerraStrom Solutions", value: "tss" }
  ])

  //const [loading, setLoading] = useState(false)  To be added later
  /*
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  */
  let history = useHistory()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ComponentFinder.get("/")
        console.log(response.data.data)
        setSiteComponents(response.data.data.site)
      } catch (err) {}
    }

    fetchData()
  }, [])

  /*
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentposts = sitecomponents.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = pageNumber => setCurrentPage(pageNumber)
  */

  const [pageNumber, setPageNumber] = useState(0)
  const componentsperPage = 8
  const pagesVisited = pageNumber * componentsperPage
  const pageCount = Math.ceil(sitecomponents.length / componentsperPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  //project_no, state_name, customer_id, developer_name
  const handlecomponentSelect = (id, sitedata) => {
    history.push({ pathname: `/sites/${id}`, state: { sitedata } })
  }
  const roundofffunc = value => {
    return Math.round(value * 100) / 100
  }

  /*
  Very important. part of original code
  const convertonoff = datapoint => {
    var valuestatus = "ON"
    if (datapoint == 1) {
      valuestatus = "OFF"
    } else if (datapoint == 1) {
      valuestatus = "ON"
    }
    return valuestatus
  }*/
  const convertonoff = datapoint => {
    var valuestatus = "ON"
    if (datapoint == 8) {
      valuestatus = "ERROR"
    } else {
      valuestatus = "ON"
    }
    return valuestatus
  }

  //site.pump_no, site.project_no, site.pump_no, site.state_name, site.customer_id, site.developer_name
  return (
    <div className="sum_table">
      <div className="sum_table_drop_down">
        <select className="stateinfo" value={statevalue} onChange={e => setStateValue(e.currentTarget.value)}>
          {stateitems.map(stateitem => (
            <option key={stateitem.label} value={stateitem.value}>
              {stateitem.label}
            </option>
          ))}
        </select>
        <select className="devinfo" value={devvalue} onChange={e => setDevValue(e.currentTarget.value)}>
          {developeritems.map(developeritem => (
            <option key={developeritem.label} value={developeritem.value}>
              {developeritem.label}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-hover ">
        <thead>
          <tr className="tablecolor">
            {/*bg-primary */}
            <th scope="col" class="align-middle">
              Project No
            </th>
            <th scope="col" class="align-middle">
              Pump No
            </th>
            <th scope="col" class="align-middle">
              State
            </th>
            <th scope="col" class="align-middle">
              Customer ID
            </th>
            <th scope="col" class="align-middle">
              Developer Name
            </th>
            <th scope="col" class="align-middle">
              Pump Status
            </th>
            <th scope="col" class="align-middle">
              Generation Today (kWh)
            </th>
            <th scope="col" class="align-middle">
              Generation Till Date (kWh)
            </th>
            <th scope="col" class="align-middle">
              Discharge Today (L/min)
            </th>
            <th scope="col" class="align-middle">
              Discharge Till Date (L/min)
            </th>
          </tr>
        </thead>
        <tbody>
          {/*site.project_no, site.state_name, site.customer_id, site.developer_name
           */}
          {sitecomponents &&
            sitecomponents.slice(pagesVisited, pagesVisited + componentsperPage).map(site => {
              return (
                <tr className={site.pump_no === 8 ? "text-danger mr-2" : "text-body mr-2"} onClick={() => handlecomponentSelect(site.pump_no, site)} key={site.pump_no}>
                  <td>{site.project_no}</td>
                  <td>{site.pump_no}</td>
                  <td>{site.project_state}</td>
                  <td>{site.customer_id}</td>
                  <td>{site.developer_name}</td>
                  <td className={site.pump_no === 8 ? "text-danger mr-2" : "text-success mr-2"}>{convertonoff(site.pump_no)}</td> {/* <td className={site.short_circuit === 1 ? "text-danger mr-2" : "text-success mr-2"}>{convertonoff(site.short_circuit)}</td> */}
                  <td>{roundofffunc(site.energy_total / 150)}</td>
                  <td>{roundofffunc(site.energy_total)}</td>
                  <td>{roundofffunc((site.discharge_total * 0.87) / 150)}</td>
                  <td>{roundofffunc(site.discharge_total * 0.87)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <ReactPaginate previousLabel={"Previous"} NextLabel={"Next"} pageCount={pageCount} onPageChange={changePage} containerClassName={"paginationButtons"} previousClassName={"previousButton"} nextLinkClassName={"NextButton"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}></ReactPaginate>
      {/*<Pagination postsPerPage={postsPerPage} totalPosts={sitecomponents.length} paginate={paginate} />*/}
    </div>
  )
}

export default Summary_table

//sitecomponents should be currentPosts for pagination in mapping function
/*
   Original return
   return (
    <div className="sum_table">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Project No</th>
            <th scope="col">Pump No</th>
            <th scope="col">Project State</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Developer Name</th>
            <th scope="col">Pump Status</th>
            <th scope="col">Generation Today</th>
            <th scope="col">Generation Till Date</th>
            <th scope="col">Discharge Today</th>
            <th scope="col">Discharge Till Date</th>
          </tr>
        </thead>
        <tbody>
          {sitecomponents &&
            sitecomponents.map(site => {
              return (
                <tr onClick={() => handlecomponentSelect(site.pump_no)} key={site.pump_no}>
                  <td>{site.project_no}</td>
                  <td>{site.pump_no}</td>
                  <td>{site.state_name}</td>
                  <td>{site.customer_id}</td>
                  <td>{site.developer_name}</td>
                  <td>{site.pump_status}</td>
                  <td>{site.generation_today}</td>
                  <td>{site.generation_till_date}</td>
                  <td>{site.discharge_today}</td>
                  <td>{site.discharge_till_date}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {/*<Pagination postsPerPage={postsPerPage} totalPosts={sitecomponents.length} paginate={paginate} />}
      </div>
*/
