require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./db")
const morgan = require("morgan")
const app = express()
const fs = require("fs")
app.use(cors())
app.use(express.json())
//stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
//https:
app.use(express.urlencoded({ extended: true }))
app.post("/api/v1/sites/filewrite", async (req, res) => {
  //var body = ''
  try {
    fs.appendFile("./sample.txt", JSON.stringify(req.body), err => {
      if (err) throw err
      console.log("The qs were updated!")
    })

    res.status(200).json({
      status: "success"
    })
  } catch (err) {
    console.log(err)
  }
})

//added on 26-Feb
/*const fs = require("fs")
const url = require("url")
app.use(express.static(__dirname))
//added on 26-Feb

app.post("/api/v1/sites/filewrite", async (req, res) => {
  console.log(req.body)
  try {
    const body = ""
    filepath = __dirname + "data.txt"
    req.on("data", function (data) {
      body += data
    })

    req.on("end", function () {
      fs.appendFile(filePath, body, function () {
        respond.end()
      })
    })
    res.status(201).json({
      status: success
    })
  } catch (err) {
    console.log(err)
  }
})
*/
//C:\Users\RRK\Desktop\desktop2\udemy\terrastrom_app\App3\server
//morgan - middlewear
//app.use(morgan("dev"))

////////////////////////////////////Home Page////////////////////////////////////
/////////////Home-old//////////////////////////////////////////////////////
/*
app.get("/api/v1/sites", async (req, res) => {
  try {
    const results = await db.query("select * from sum_table")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        site: results.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})
*/
app.get("/api/v1/sites", async (req, res) => {
  try {
    //const results = await db.query("select * from pumps_info")
    const results = await db.query("select * from ((select pump_no,sum(discharge) as discharge_total, sum(panel_energy) as energy_total from pumpdata_three group by pump_no)a left join ((select * from pumps_info) c left join (select * from (select pump_no as pump_number,datetime,panel_energy,pump_on,short_circuit, excess_temperature,fan_on,no_load_run,discharge,row_number() over (partition by pump_no order by datetime desc) as rn from pumpdata_three where datetime<current_timestamp at time zone 'UTC-5:30') t where t.rn=1)d on (d.pump_number=c.pump_no))b on (a.pump_no=b.pump_no))")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        site: results.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})
app.get("/api/v1/sites/maps", async (req, res) => {
  try {
    //const results = await db.query("select * from pumps_info")
    const results = await db.query("select * from pumps_info")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        mapsdata: results.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/chartdata/:id", async (req, res) => {
  var datareqbod = req.body

  console.log(req.params.id, req.query.startingDate, req.query.endingDate)
  try {
    const queryres = await db.query("select *,datetime + interval '5.5h' as datetime2 from pumpdata_three where pump_no = $1 and datetime >=$2 and datetime <$3", [req.params.id, req.query.startingDate, req.query.endingDate])
    //const queryres2 = await db.query("select datetime,irr,current_energy from inverter_data_two where site = $1 and datetime>=$2 and datetime<$3", [req.params.id, req.query.startingDate, req.query.endingDate])
    //const queryres = await db.query("select * from inverter_data_two where site = $1 and datetime>=$2", [req.params.id, req.query.startingDate])

    res.status(200).json({
      status: "success",
      //results: results.rows.length,
      data: {
        resquery: queryres
        //resquery2: queryres2
      }
    })
    //console.log(queryres)
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/chartdata2/:id", async (req, res) => {
  var datareqbod = req.body

  console.log(req.params.id, req.query.startingDate, req.query.endingDate)
  try {
    const queryres = await db.query("select rms_current,rms_voltage,panel_energy,discharge,datetime + interval '5.5h' as datetime2 from pumpdata_three where pump_no = $1 and datetime >=$2 and datetime <$3", [req.params.id, req.query.startingDate, req.query.endingDate])
    //const queryres2 = await db.query("select datetime,irr,current_energy from inverter_data_two where site = $1 and datetime>=$2 and datetime<$3", [req.params.id, req.query.startingDate, req.query.endingDate])
    //const queryres = await db.query("select * from inverter_data_two where site = $1 and datetime>=$2", [req.params.id, req.query.startingDate])

    res.status(200).json({
      status: "success",
      //results: results.rows.length,
      data: {
        resquery: queryres
        //resquery2: queryres2
      }
    })
    //console.log(queryres)
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/site/:id", async (req, res) => {
  //console.log(req.params.id)
  try {
    //const todaydate = new Date()
    const site_inst = await db.query("select * from pumpdata_three where datetime<current_timestamp at time zone 'UTC-5:30' and pump_no=$1 order by datetime desc limit 1 ", [req.params.id])
    const site_info = await db.query("select * from pumps_info where pump_no=$1", [req.params.id])

    res.status(200).json({
      status: "success",
      //results: results.rows.length,
      data: {
        site_instant: site_inst.rows[0],
        site_info: site_info.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/reportdata/:id", async (req, res) => {
  try {
    //const results = await db.query("select * from sum_table")
    const results = await db.query("select *,datetime + interval '5.5h' as datetime from pumpdata_three where pump_no = $1 and datetime >=$2 and datetime <$3", [req.params.id, req.query.startingDate, req.query.endingDate])
    //console.log(results)
    //console.log(column_names.rows.length)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows
    })
  } catch (err) {
    console.log(err)
  }
})

app.post("/api/v1/pump_data", async (req, res) => {
  //console.log(req.query)
  dt = new Date()
  try {
    const results = await db.query("INSERt INTO pumpdata_four (datetime,rms_voltage,rms_current,panel_energy,panel_energy_today,panel_energy_total,temperature,pump_on,short_circuit,excess_temperature,fan_on,no_load_run,discharge,pump_no) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)", [dt, req.query.F1, req.query.F2, req.query.F3, req.query.F4, req.query.F5, req.query.F6, req.query.S1, req.query.S2, req.query.S3, req.query.S4, req.query.S5, req.query.S6, req.query.S7])
    /*res.status(201).json({
      status: success
      //send: "data added"
    })*/

    res.status(200).send("Data Added") //https://stackoverflow.com/questions/38158027/express-4-14-how-to-send-200-status-with-a-custom-message
  } catch (err) {
    console.log(err)
  }
})

/////////////////////////////////////////////////////////////////////////////
app.get("/api/v1/sites/errorlist", async (req, res) => {
  try {
    const errorpumps = await db.query("select * from error_pumps")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: errorpumps.rows.length,
      data: {
        site: errorpumps.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/reports", async (req, res) => {
  try {
    const results = await db.query("select * from sum_table")
    //console.log(results)
    //console.log(column_names.rows.length)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/errorlist", async (req, res) => {
  try {
    const errorpumps = await db.query("select * from error_pumps")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: errorpumps.rows.length,
      data: {
        site: errorpumps.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/reportscol", async (req, res) => {
  try {
    const column_names = await db.query("SELECT * from information_schema.columns WHERE table_name='sum_table'")
    //console.log(results)
    console.log(column_names.rows.column_name)
    res.status(200).json({
      status: "success",
      results: column_names.rows.length,
      data: column_names.rows
    })
  } catch (err) {
    console.log(err)
  }
})

app.post("/api/v1/sites", async (req, res) => {
  console.log(req.body)
  try {
    const results = await db.query("INSERt INTO error_pumps (project_no,pump_no,state_id,customer_id,developer,error_no,from_time,to_time) values ($1,$2,$3,$4,$5,$6,$7,$8)", [req.body.pj_no, req.body.pu_no, req.body.sid, req.body.cid, req.body.dev, req.body.er_no, req.body.frtime, req.body.totime])
    res.status(201).json({
      status: success
    })
  } catch (err) {
    console.log(err)
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
