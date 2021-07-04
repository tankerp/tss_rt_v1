import React from "react"
//import { useHistory } from "react-router-dom"
//https://www.npmjs.com/package/react-moment-> Is it necessary?
import Moment from "react-moment"
import symb from "./Slice-2-3-e1602342563858.png"
import stock from "./stock.png"
import developer from "./Capture.PNG"
import "./Header.css"
import { Link } from "react-router-dom"
const Header = () => {
  const datetimes = new Date()
  let date = datetimes.getDate()

  //let history = useHistory()
  /*const tohomepage = () => {
    history.push("/Home")
  }*/

  //onClick={tohomepage()}

  return (
    <>
      <div className="header_items">
        <div className="logo-det">
          {
            //<img src={symb} onClick={tohomepage} width={100}></img>
          }
          <img src={symb} width={100}></img>
        </div>
        <div className="datetime">
          <Moment date={datetimes} format="YYYY/MM/DD HH:MM" />
        </div>
        <div className="logo-dev">
          <img src={stock} width={60}></img>
          {/*developer */}
        </div>
        <div className="User-info">
          <p></p>
          <p>Hi</p>
          <p>Srikant</p>
        </div>
      </div>
    </>
  )
}

export default Header

/*
import React from "react"
import { useHistory } from "react-router-dom"
import symb from "./Slice-2-3-e1602342563858.png"
import "./Header.css"
import { Link } from "react-router-dom"
function Header() {
  let history = useHistory()
  const tohomepage = () => {
    history.push("/Home")
  }
  return (
    <>
      <div className="logo-det">
        <img src={symb} onClick={tohomepage} width={100}></img>
      </div>

      <div className="navbar-menuItems">
        <ul>
          <Link to="/Home">Home</Link>
          <Link to="/Components">Components</Link>
          <Link to="/Reports">Reports</Link>
        </ul>
      </div>
    </>
  )
}

export default Header
*/
/*
<a href="#">Home</a>
        <a href="#">Components</a>
        <a href="#">Reports</a>
*/
{
  /*
      <div className="header_search">
        <div className="header_searchContainer">
          <input placeholder="search" type="text" />
        </div>
      </div>
      */
}
