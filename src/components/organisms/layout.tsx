import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

interface Props {
  location: Location
  children: any
}

const Layout: React.FC<Props> = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <h1 className="main-heading">
          <Link to="/blog-list">
            <StaticImage
              className="header-image"
              layout="fixed"
              formats={["auto", "webp", "avif"]}
              src="../../images/gatsby-icon.png"
              width={100}
              alt="header image"
            />
          </Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer className="page-footer">
        SINCE 2021, BUILT WITH
        {` `}
        <a href="https://www.gatsbyjs.com">GATSBY</a>
      </footer>
    </div>
  )
}

export default Layout
