import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from "@material-ui/core"
import React from "react"

export default function RadioGroup(props) {
  const { name, label, value, onChange, items } = props
  return (
    <FormControl>
      <FormLabel>Gender</FormLabel>
      <MuiRadioGroup row={true} name={name} value={value} onChange={onChange}>
        {items.map((item, index) => (
          <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
        ))}
      </MuiRadioGroup>
    </FormControl>
  )
}
