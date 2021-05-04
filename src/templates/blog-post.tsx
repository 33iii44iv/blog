import * as React from "react"
import { graphql, Link } from "gatsby"

import Bio from "../components/atoms/bio"
import Layout from "../components/organisms/layout"
import SEO from "../components/atoms/seo"
import tagDict from "../components/functions/tag-dict"

interface Props {
  data: any
  location: any
}

const BlogPostTemplate: React.FC<Props> = ({ data, location }) => {
  const post = data.markdownRemark
  const { previous, next } = data
  const tags: string[] = post.frontmatter.tags

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>
            <span>{post.frontmatter.date}</span>
            {tags.map(tag => {
              return (
                <span key={tag}>
                  <a href={`/tags/${tag}`} className="tag-label">{tagDict[tag]}</a>
                </span>
              )
            })}
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0
            }}
          >
            <li className="next-prev-title">
              {next && (
                <Link to={next.fields.slug} rel="next">
                  ← {next.frontmatter.title}({next.frontmatter.date})
                </Link>
              )}
            </li>
            <li className="next-prev-title">
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  {previous.frontmatter.title}({previous.frontmatter.date}) →
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY/M/DD")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY/M/DD")
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY/M/DD")
      }
    }
  }
`
