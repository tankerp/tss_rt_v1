import React, { useState, useEffect } from "react"
import "./Maps.css"
//import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Icon } from "leaflet"
//import * as siteData from "./../data_maps/mapsdata.json"
import ComponentFinder from "../apis/ComponentFinder"
const Mapss = () => {
  const [activePark, setActivePark] = useState(null)
  const [siteData, setSiteData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ComponentFinder.get("/maps")
        console.log(response.data.data.mapsdata)
        setSiteData(response.data.data.mapsdata)
      } catch (err) {}
    }

    fetchData()
  }, [])

  const mapsData = () => {
    if (!siteData) {
      return <div>Loading....</div>
    }
    return (
      <>
        <div className="maps_border">
          <div className="maps_container" style={{ width: "650px" }}>
            <MapContainer center={[19.38, 82.12]} zoom={5.25}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
              {siteData.map(pump => (
                <Marker
                  key={pump.pump_no}
                  position={[pump.location_lat, pump.location_long]}
                  onMouseOver={e => {
                    e.target.openPopup()
                  }}
                  onMouseOut={e => {
                    e.target.closePopup()
                  }}
                >
                  <Popup>
                    <div>
                      <p>Pump No: {pump.pump_no}</p>
                      <p>Customer ID: {pump.customer_id}</p>
                      <p>Developer Name: {pump.developer_name}</p>
                      <p>Project No: {pump.project_no}</p>
                      <p>State: {pump.project_state}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div>{mapsData()}</div>
    </>
  )
}

export default Mapss
