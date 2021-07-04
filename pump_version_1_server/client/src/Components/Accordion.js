import React from "react"
import Chevron from "./Chevron"
import "./accordion.css"

function Accordion(props) {
  return (
    <div className="accordion__section">
      <button className="accordion">
        <p className="accordion__title">{props.title}</p>
        <Chevron className={"accordion__icon"} width={10} fill={"#777"} />
      </button>
      <div className="accordion__content">
        <div className="accordion__text" dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </div>
  )
}

export default Accordion
