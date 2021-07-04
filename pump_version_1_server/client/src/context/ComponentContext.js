import React, { useState, createContext } from "react"

export const ComponentContext = createContext()

export const ComponentContextProvider = props => {
  const [sitecomponents, setSiteComponents] = useState([])
  const [selectedsite, setSelectedsite] = useState([])
  const [siteerrcomponents, setSiteerrComponents] = useState([])
  //replaced {} with [] above
  return (
    <ComponentContext.Provider
      value={{
        sitecomponents,
        setSiteComponents,
        selectedsite,
        setSelectedsite,
        siteerrcomponents,
        setSiteerrComponents
      }}
    >
      {props.children}
    </ComponentContext.Provider>
  )
}
