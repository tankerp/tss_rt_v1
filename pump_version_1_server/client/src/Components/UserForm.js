import { Grid, TextField, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Header from "./Header"
import Controls from "./controls/Controls"
import * as employeeService from "./../services/EmployeeService"
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
  company: ""
}
function UserForm() {
  //const [values, setValues] = useState(initialFValues)

  const validate = () => {
    let temp = {}
    temp.fullName = values.fullName ? "" : "This field is required."
    temp.email = /$^|.+@.+..+/.test(values.email) ? "" : "Email is not valid."
    temp.mobile = values.mobile.length > 9 ? "" : "Min 10 nos required."
    temp.departmentId = values.departmentId.length != 0 ? "" : "This field is required."
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
          </Grid>
        </Grid>
      </Form>
    </>
  )
}

export default UserForm
