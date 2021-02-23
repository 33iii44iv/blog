import React, { useState } from "react"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"

import Styles from "./styles.module.scss"
import SEO from "../../atoms/seo"
import Logo from "../../atoms/logo"

import Person from "../../../images/home_parts/person.svg"
import FaceBreakPerson from "../../../images/home_parts/face_break_person.svg"
import SoulSmoke from "../../../images/home_parts/soul_smoke.svg"
import DownIcon from "../../../images/home_parts/down.svg"
import UpIcon from "../../../images/home_parts/up.svg"
import Network from "../../../images/home_parts/network.svg"
import TwitterIcon from "../../../images/home_parts/twitter_icon.svg"
import GithubIcon from "../../../images/home_parts/github_icon.svg"


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
  // @ts-ignore
  let [parallax, setParallax] = useState<Parallax | null>(null)

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
          <ParallaxLayer offset={1} speed={10} className={Styles.smoke}>
            <img src={SoulSmoke} className={Styles.shadowXL + " " + Styles.SoulSmoke} alt="" />
          </ParallaxLayer>


          {/*github twitter*/}
          <ParallaxLayer offset={1.05} speed={-1} style={{ pointerEvents: "none" }}>
            <div style={{ marginLeft: "45%", textAlign: "right" }}>
              <div style={{ marginRight: "5%" }}>
                <a href="https://github.com/33iii44iv" style={{ pointerEvents: "auto" }}>
                  <img src={GithubIcon} style={{ minWidth: "50px", width: "5%", zIndex: 10000 }} alt="" />
                </a>
                <a href="https://twitter.com/33iii44iv" style={{ pointerEvents: "auto" }}>
                  <img src={TwitterIcon} style={{ minWidth: "50px", width: "5%", zIndex: 10000, marginLeft: "10px" }}
                       alt="" />
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
                <img className={Styles.shadowXL} src={item.personType} style={{ width: item.personWidth }} alt="" />
              </ParallaxLayer>
              <ParallaxLayer offset={item.pageNum + 0.88} speed={0} style={{ pointerEvents: "none" }}>
                <div className={Styles.upDown}>
                  <img src={item.upDownIconType} onClick={() => {
                    parallax.scrollTo(item.scrollTo)
                  }} alt="" />
                </div>
              </ParallaxLayer>
            </div>
          ))}

        </Parallax>

      </div>
    </div>
  )
}