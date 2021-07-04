import React from "react"
import Header from "./../Components/Header"
import Summary_table from "./../Components/Summary_table"
import Mapss from "./../Components/Mapss"
import Error_list from "../Components/Error_list"
import "./Home.css"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    minWidth: 200
  }
})

const Home = () => {
  const classes = useStyles()
  return (
    <>
      <div className="navbar_header">
        <Header></Header>
      </div>
      <div className="Home-Top">
        <div className="Cards-Table">
          <Grid container>
            <Summary_table />
          </Grid>
        </div>

        <div className="Home-Map2">
          <Mapss />
        </div>
      </div>
      <div style={{ height: 2 }}></div>
      <div className="Home-Bottom">
        <Error_list />
      </div>
    </>
  )
}

export default Home

/*
Old
<div className="navbar_header">
        <Header></Header>
      </div>
      <div className="home_body">
        <div className="home_container">
          <Summary_table />
          <Mapss />
        </div>
        <div>
          <Error_list />
        </div>
      </div>
    </>
*/
