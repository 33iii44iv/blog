import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import SiteIcon from "../../../images/gatsby-icon.png"

interface Props {
  description?: string
  lang?: string
  title: string
}

const Index: React.FC<Props> = ({ description, lang, title }) =>  {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : ''}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: defaultTitle
        },
        {
          property: `og:description`,
          content: title
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``
        },
        {
          name: `twitter:title`,
          content: defaultTitle
        },
        {
          name: `twitter:description`,
          content: title
        },
        {
          property: `twitter:image`,
          content: `${siteUrl}${SiteIcon}`,
        },
      ]}
    >
    </Helmet>
  )
}

export default Index