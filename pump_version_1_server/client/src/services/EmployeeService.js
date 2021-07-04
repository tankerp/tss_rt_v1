// According to best practices, recommended to store string employees (in insertEmployee)
// in a const variable to avoid using this string in other operations like
//delete, edit and so on...
const KEYS = {
  employees: "employees",
  employeeID: "employeeID"
}

export const getDepartmentCollection = () => [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" }
]

export function insertEmployee(data) {
  let employees = getAllEmployees()
  data["id"] = generateEmployeeId()
  employees.push(data)
  localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeID) == null) {
    localStorage.setItem(KEYS.employeeID, "0")
  }
  var id = parseInt(localStorage.getItem(KEYS.employeeID))
  localStorage.setItem(KEYS.employeeID, (++id).toString())
  return id
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null) {
    localStorage.setItem(KEYS.employees, JSON.stringify([]))
    // if local storage is null, initialize it with an empty array
  }
  let employees = JSON.parse(localStorage.getItem(KEYS.employees))
  //map departmentID to department title
  let departments = getDepartmentCollection()
  return employees.map(x => ({
    ...x,
    department: departments[x.departmentId - 1].title
  }))
  //return JSON.parse(localStorage.getItem(KEYS.employees)) //return array of employees
}
