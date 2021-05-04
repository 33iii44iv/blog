import React from "react"
import * as Styles from "./styles.module.scss"

interface Props {
  length: number
}

const Index: React.FC<Props> = ({ length }) => {

  return (
    <div
      className={Styles.logo}
      style={{
        width: `${length}px`,
        height: `${length}px`
      }}
    > </div>
  )
}

export default Index