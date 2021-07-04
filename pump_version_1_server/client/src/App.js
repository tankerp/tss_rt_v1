import React from "react"
//import { BrowserRouter as Router, Route } from "react-router-dom"
import { Switch, Route, useLocation } from "react-router-dom"
import Home from "./routes/Home"
import "./App.css"
import Reports from "./routes/Reports"
import Loginroute from "./routes/Loginroute"
//import Header from "./Components/Header"
import { ComponentContextProvider } from "./context/ComponentContext"
import { AuthProvider } from "./context/AuthContext"
import SitePage2 from "./routes/SitePage2"
import Users from "./Components/Users"
import Sites_config from "./Components/Sites_config"

function App() {
  return (
    <ComponentContextProvider>
      <div className="App">
        {/*
        <div className="navbar_header">
          <Header></Header>
        </div>
        */}
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Loginroute}></Route>
            <Route path="/sites/:id" component={SitePage2} />
            <Route path="/Home" component={Home} />
            <Route path="/Reports" component={Reports} />
            <Route path="/UserForm" component={Users}></Route>
            <Route path="/SiteForm" component={Sites_config}></Route>
          </Switch>
        </AuthProvider>
      </div>
    </ComponentContextProvider>
  )
}

export default App
