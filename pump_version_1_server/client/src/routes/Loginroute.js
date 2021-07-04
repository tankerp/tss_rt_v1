import React from "react"
//import Header from "./../Components/Header"
import Login from "./../Components/Login"
import "./Loginroute.css"
import tsslogo from "../img/tsslogo.jpg"
// Background image tutorial: https://www.freecodecamp.org/news/react-background-image-tutorial-how-to-set-backgroundimage-with-inline-css-style/

const Loginroute = () => {
  return (
    <>
      <div className="home_body" style={{ backgroundImage: `url(${tsslogo})`, height: "800px" }}>
        <Login />
      </div>
    </>
  )
}

export default Loginroute
