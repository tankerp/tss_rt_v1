import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from "@material-ui/core"
import React, { useState } from "react"
import Header from "./Header"
import UserForm from "./UserForm"
import UseTable from "./controls/UseTable"
import * as EmployeeService from "./../services/EmployeeService"
import Controls from "./controls/Controls"
import { Search } from "@material-ui/icons"
import AddIcon from "@material-ui/icons/Add"
import PopUp from "./controls/PopUp"
const useStyles = makeStyles(theme => ({
  pageContent: {
    // Gives padding and spacing to paper
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: "75%"
  },
  newButton: {
    position: "absolute",
    right: "10px"
  }
}))

const headCells = [
  { id: "fullName", label: "Employee name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department", disableSorting: true }
]
function Users() {
  const classes = useStyles()
  const [records, setRecords] = useState(EmployeeService.getAllEmployees())
  const [openPopup, setOpenPopup] = useState(false)
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(records, headCells, filterFn)
  const handleSearch = e => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value == "") {
          return items
        } else {
          return items.filter(x => x.fullName.toLowerCase().includes(target.value))
        }
      }
    })
  }
  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            className={classes.searchInput}
            label="Search Employees"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={handleSearch}
          />
          <Controls.Button text="Add New" variant="outlined" startIcon={<AddIcon />} className={classes.newButton} onClick={() => setOpenPopup(true)} />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <PopUp openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <UserForm />
      </PopUp>
    </>
  )
}

export default Users
