import React from "react"
import "./Box.css" //responsible for definition of box 1-6

/*
Code responsible for displaying the cards data. 
1. data retrieved from backend is sent as props to the SiteComponents function.
2. renderData() has access to the props data. If data exists, display all parameters.
3. renderData() is called in return statement
*/
const SiteComponents = data => {
  //console.log(data.data)

  const renderData = () => {
    if (data.data.data) {
      return (
        <>
          <div>
            <div className="grid">
              <div className="box box1 text-center"> Temperature:{data.data.data.temp.temperature}</div>
              <div className="box box2 text-center"> DC power:{data.data.data.dcp.powerval}</div>
              <div className="box box3 text-center"> AC power:{data.data.data.acp["?column?"]}</div>
              <div className="box box4 text-center"> DC Voltage:{data.data.data.dcv.voltage}</div>
              <div className="box box5 text-center"> DC current:{data.data.data.dcc.currentval}</div>
              <div className="box box6 text-center"> Pump Status:{data.data.data.pst.pump_status}</div>
            </div>
          </div>
        </>
      )
    }
  }
  return <div>{renderData()}</div>
}

export default SiteComponents
