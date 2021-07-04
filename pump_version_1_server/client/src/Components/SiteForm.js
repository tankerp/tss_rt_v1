import { Grid, TextField, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Header from "./Header"
import Controls from "./controls/Controls"
import * as employeeService from "../services/EmployeeService"
import * as Siteservice from "../services/Siteservices"
import { UseForm, Form } from "./UseForm"

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" }
]

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
  role: "admin",
  company: "",
  //new parameters for site
  project_no: "",
  siteaddress: "",
  state: "",
  country: "",
  sitecoordinat_lat: "",
  sitecoordinat_long: "",
  customername: "",
  customercontactno: "",
  commissiondate: new Date(),
  installedcapacity_kwp: "",
  installedcapacity_kw: "",
  projecttype: "",
  modulemake: "",
  modulecapacity: "",
  pumpmake: "",
  pumprating: "",
  pumptype: "",
  controller_make: "",
  controller_no: "",
  ePC_contractor: "",
  contact_no_epc: "",
  onm_contractor: "",
  contact_no_onm: ""
}
function SiteForm() {
  //const [values, setValues] = useState(initialFValues)

  const validate = () => {
    let temp = {}
    temp.fullName = values.fullName ? "" : "This field is required."
    temp.email = /$^|.+@.+..+/.test(values.email) ? "" : "Email is not valid."
    temp.mobile = values.mobile.length > 9 ? "" : "Min 10 nos required."
    temp.departmentId = values.departmentId.length != 0 ? "" : "This field is required."
    temp.project_no = values.project_no ? "" : "This field is required."
    temp.siteaddress = values.siteaddress ? "" : "This field is required."
    temp.state = values.state ? "" : "This field is required."
    temp.country = values.country ? "" : "This field is required."
    temp.sitecoordinat_lat = values.sitecoordinat_lat ? "" : "This field is required."
    temp.sitecoordinat_long = values.sitecoordinat_long ? "" : "This field is required."
    temp.customername = values.customername ? "" : "This field is required."
    temp.customercontactno = values.customercontactno.length > 9 ? "" : "Min 10 nos required."
    //temp.commissiondate = values.commissiondate ? "" : "This field is required."
    temp.installedcapacity_kwp = values.installedcapacity_kwp ? "" : "This field is required."
    temp.installedcapacity_kw = values.installedcapacity_kw ? "" : "This field is required."
    temp.projecttype = values.projecttype.length != 0 ? "" : "This field is required."
    temp.modulemake = values.modulemake ? "" : "This field is required."
    temp.modulecapacity = values.modulecapacity ? "" : "This field is required."
    temp.pumpmake = values.pumpmake ? "" : "This field is required."
    temp.pumprating = values.pumprating ? "" : "This field is required."
    temp.pumptype = values.pumptype ? "" : "This field is required."
    temp.controller_make = values.controller_make ? "" : "This field is required."

    setErrors({ ...temp })
    return Object.values(temp).every(x => x == "")
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = UseForm(initialFValues)

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      employeeService.insertEmployee(values) //window.alert("Submitted")
      resetForm()
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          {
            //<h3>Site Info</h3>
          }
          <Grid item xs={6}>
            <Controls.Input label="Project Number" name="project_no" value={values.project_no} onChange={handleInputChange} error={errors.project_no} />
            <Controls.Input label="State" name="state" value={values.state} onChange={handleInputChange} error={errors.state} />
            <Controls.Input label="Site Coordinat Latitude" name="sitecoordinat_lat" value={values.sitecoordinat_lat} onChange={handleInputChange} error={errors.sitecoordinat_lat} />
            <Controls.Input label="Customer Name" name="customername" value={values.customername} onChange={handleInputChange} error={errors.customername} />
            {/*<Controls.Input label="Project Type" name="projecttype" value={values.projecttype} onChange={handleInputChange} error={errors.projecttype} />*/}
            <Controls.Select label="Project Type" name="projecttype" value={values.projecttype} onChange={handleInputChange} options={Siteservice.projecttypeCollection()} error={errors.projecttype} />
            <Controls.Input label="Installed Capacity (kWp)" name="installedcapacity_kwp" value={values.installedcapacity_kwp} onChange={handleInputChange} error={errors.installedcapacity_kwp} />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input label="Site Address" name="siteaddress" value={values.siteaddress} onChange={handleInputChange} error={errors.siteaddress} />
            <Controls.Input label="Country" name="country" value={values.country} onChange={handleInputChange} error={errors.country} />
            <Controls.Input label="Site Coordinat Longitude" name="sitecoordinat_long" value={values.sitecoordinat_long} onChange={handleInputChange} error={errors.sitecoordinat_long} />
            {/*<Controls.Input label="Commission Date" name="commissiondate" value={values.commissiondate} onChange={handleInputChange} error={errors.commissiondate} />*/}
            <Controls.DatePicker label="Commission Date" name="commissiondate" value={values.commissiondate} onChange={handleInputChange} />
            <Controls.Input label="Customer Contact No" name="customercontactno" value={values.customercontactno} onChange={handleInputChange} error={errors.customercontactno} />
            <Controls.Input label="Installed Capacity (kW)" name="installedcapacity_kw" value={values.installedcapacity_kw} onChange={handleInputChange} error={errors.installedcapacity_kw} />
          </Grid>
          {
            //<h3>Project Info</h3>
          }
          <Grid item xs={6}>
            <Controls.Input label="Module Make" name="modulemake" value={values.modulemake} onChange={handleInputChange} error={errors.modulemake} />
            <Controls.Input label="Module Capacity" name="modulecapacity" value={values.modulecapacity} onChange={handleInputChange} error={errors.modulecapacity} />
            <Controls.Input label="Controller Make" name="controller_make" value={values.controller_make} onChange={handleInputChange} error={errors.controller_make} />
            <Controls.Input label="Controller Number" name="controller_no" value={values.controller_no} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input label="Pump Make" name="pumpmake" value={values.pumpmake} onChange={handleInputChange} error={errors.pumpmake} />
            <Controls.Input label="Pump Rating" name="pumprating" value={values.pumprating} onChange={handleInputChange} error={errors.pumprating} />
            <Controls.Input label="Pump Type" name="pumptype" value={values.pumptype} onChange={handleInputChange} error={errors.pumptype} />
          </Grid>

          <Grid item xs={6}>
            <Controls.Input label="EPC Contractor" name="ePC_contractor" value={values.ePC_contractor} onChange={handleInputChange} />
            <Controls.Input label="EPC Contact No" name="contact_no_epc" value={values.contact_no_epc} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
            <Controls.Input label="OnM Contractor" name="onm_contractor" value={values.onm_contractor} onChange={handleInputChange} error={errors.onm_contractor} />
            <Controls.Input label="OnM Contact No" name="contact_no_onm" value={values.contact_no_onm} onChange={handleInputChange} error={errors.contact_no_onm} />
          </Grid>

          <Grid item xs={6}>
            <div>
              <Controls.Button variant="contained" type="submit" text="Submit" />
              <Controls.Button variant="contained" type="submit" text="Reset" color="default" onClick={resetForm} />
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  )
}

export default SiteForm

/*
Old form for site
{
          <Grid item xs={6}>
            <Controls.Input label="Full Name" name="fullName" value={values.fullName} onChange={handleInputChange} error={errors.fullName} />
            <Controls.Input label="Email" name="email" value={values.email} onChange={handleInputChange} error={errors.email} />
            <Controls.Input label="Mobile" name="mobile" value={values.mobile} onChange={handleInputChange} error={errors.mobile} />
            <Controls.Input label="City" name="city" value={values.city} onChange={handleInputChange} error={errors.city} />
          </Grid>

          <Grid item xs={6}>
            <Controls.RadioGroup name="gender" label="Gender" value={values.gender} onChange={handleInputChange} items={genderItems} />
            <Controls.Select name="departmentId" label="Department" value={values.departmentId} onChange={handleInputChange} options={employeeService.getDepartmentCollection()} error={errors.departmentId} />
            <Controls.DatePicker name="hireDate" label="Hire Date" value={values.hireDate} onChange={handleInputChange} />
            <Controls.Checkbox name="isPermanent" label="Permanent Employee" value={values.isPermanent} onChange={handleInputChange} />
            <div>
              <Controls.Button variant="contained" type="submit" text="Submit" />
              <Controls.Button variant="contained" type="submit" text="Reset" color="default" onClick={resetForm} />
            </div>
</Grid>}
*/
