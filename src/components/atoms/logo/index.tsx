// @ts-ignore
import React from "react"
// @ts-ignore
import Styles from "./styles.module.scss"

export default function index({ length }) {

  return (
    <div
      className={Styles.logo}
      style={{
        width: `${length}px`,
        height: `${length}px`
      }}
    ></div>
  )
}