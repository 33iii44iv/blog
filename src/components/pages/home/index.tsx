// @ts-ignore
import React, { useState } from "react"

import ReactDOM from "react-dom"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
// import { Parallax, ParallaxLayer } from '@react-spring/addons'
// import { Parallax, ParallaxLayer } from "@react-spring/parallax"
// @ts-ignore
import Styles from "./styles.module.scss"
import SEO from "../../atoms/seo"
import Logo from "../../atoms/logo"
// @ts-ignore
import Person from "../../../images/home_parts/person.svg"
// @ts-ignore
import FaceBreakPerson from "../../../images/home_parts/face_break_person.svg"
// @ts-ignore
import SoulSmoke from "../../../images/home_parts/soul_smoke.svg"
// @ts-ignore
import DownIcon from "../../../images/home_parts/down.svg"
// @ts-ignore
import UpIcon from "../../../images/home_parts/up.svg"
// @ts-ignore
import Network from "../../../images/home_parts/network.svg"
// @ts-ignore
import TwitterIcon from "../../../images/home_parts/twitter_icon.svg"
// @ts-ignore
import GithubIcon from "../../../images/home_parts/github_icon.svg"


type parallaxItem = {
  id: number
  offset: number
  speed: number
  width: string
  marginLeft: string
}

type pageItem = {
  pageNum: number
  japaneseText: string
  englishText: string
  personType: string
  personWidth: string
  upDownIconType: string
  scrollTo: number
}

export default function Index() {
  let [parallax, setParallax] = useState(null)

  const pageContents: pageItem[] = [
    {
      pageNum: 0,
      japaneseText: "わたしはWEBエンジニアです。",
      englishText: "I'm a web engineer.",
      personType: Person,
      personWidth: "200px",
      upDownIconType: DownIcon,
      scrollTo: 1
    },
    {
      pageNum: 1,
      japaneseText: "わたしはたくさんのアイデアを考えます。",
      englishText: "I come up with a lot of ideas.",
      personType: FaceBreakPerson,
      personWidth: "210px",
      upDownIconType: DownIcon,
      scrollTo: 2
    },
    {
      pageNum: 2,
      japaneseText: "そしてコーディングを続けます。",
      englishText: "And we'll continue coding.",
      personType: Person,
      personWidth: "200px",
      upDownIconType: UpIcon,
      scrollTo: 0
    }
  ]

  const soulSmokeParams: parallaxItem[] = [
    { id: 1, offset: 1, speed: 5, width: "50%", marginLeft: "5%" },
    { id: 2, offset: 1, speed: 2, width: "40%", marginLeft: "-20%" },
    { id: 3, offset: 1.25, speed: 6, width: "65%", marginLeft: "-10%" },
    { id: 4, offset: 1.15, speed: 5, width: "65%", marginLeft: "15%" },
    { id: 5, offset: 1.2, speed: 3, width: "65%", marginLeft: "-40%" },
    { id: 6, offset: 1.3, speed: 4, width: "50%", marginLeft: "35%" },
    { id: 7, offset: 1.4, speed: 2, width: "40%", marginLeft: "-50%" },
    { id: 8, offset: 1.45, speed: 1, width: "50%", marginLeft: "-15%" },
    { id: 9, offset: 1.5, speed: 5, width: "40%", marginLeft: "20%" },
    { id: 10, offset: 1.55, speed: 6, width: "50%", marginLeft: "40%" },
    { id: 11, offset: 1.65, speed: 3, width: "50%", marginLeft: "-30%" }
  ]

  return (
    <div>
      <SEO title="Home" />
      <div>
        <Parallax pages={pageContents.length} ref={(ref) => (setParallax(ref))} style={{ background: "#efefef" }}>

          {/*背景*/}
          <ParallaxLayer offset={0} speed={-0.1} factor={3}
                         style={{
                           backgroundImage: "url(\"" + Network + "\")",
                           backgroundSize: "cover",
                           pointerEvents: "none"
                         }} />

          {/*赤っぽい煙*/}
          {soulSmokeParams.map(item => (
            <ParallaxLayer offset={item.offset} speed={item.speed} key={item.id} className={Styles.smoke}>
              <img src={SoulSmoke} className={Styles.shadowXL}
                   style={{ width: item.width, maxWidth: "350px", marginLeft: item.marginLeft }} />
            </ParallaxLayer>
          ))}

          {/*github twitter*/}
          <ParallaxLayer offset={1.05} speed={-1} style={{ pointerEvents: "none" }}>
            <div style={{ marginLeft: "45%", textAlign: "right" }}>
              <div style={{ marginRight: "5%" }}>
                <a href="https://github.com/33iii44iv" style={{ pointerEvents: "auto" }}>
                  <img src={GithubIcon} style={{ minWidth: "50px", width: "5%", zIndex: 10000 }} />
                </a>
                <a href="https://twitter.com/33iii44iv" style={{ pointerEvents: "auto" }}>
                  <img src={TwitterIcon} style={{ minWidth: "50px", width: "5%", zIndex: 10000, marginLeft: "10px" }} />
                </a>
              </div>
            </div>
          </ParallaxLayer>

          {/*ロゴ*/}
          <ParallaxLayer offset={0} speed={-1} className={Styles.logoStyle} style={{ pointerEvents: "none" }}>
            <span style={{ pointerEvents: "auto" }} className={Styles.shadowWhite} onClick={() => parallax.scrollTo(0)}><Logo
              length={200} /></span>
          </ParallaxLayer>

          {/*ページコンテンツ*/}
          {pageContents.map(item => (
            <div key={item.pageNum}>
              <ParallaxLayer offset={item.pageNum + 0.15} speed={1} style={{ pointerEvents: "none" }}>
                <div className={Styles.mainText}>{item.japaneseText}<br />{item.englishText}</div>
              </ParallaxLayer>
              <ParallaxLayer offset={item.pageNum} speed={0} className={Styles.person}
                             style={{ pointerEvents: "none" }}>
                <img className={Styles.shadowXL} src={item.personType} style={{ width: item.personWidth }} />
              </ParallaxLayer>
              <ParallaxLayer offset={item.pageNum + 0.88} speed={0} style={{ pointerEvents: "none" }}>
                <div className={Styles.upDown}>
                  <img src={item.upDownIconType} onClick={() => parallax.scrollTo(item.scrollTo)} />
                </div>
              </ParallaxLayer>
            </div>
          ))}

        </Parallax>

      </div>
    </div>
  )
}