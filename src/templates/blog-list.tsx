import * as React from "react"
import { graphql, Link } from "gatsby"

import Bio from "../components/atoms/bio"
import Layout from "../components/organisms/layout"
import SEO from "../components/atoms/seo"
import PostListItem from "../components/molecules/post-list-item"

interface Props {
  data: any
  location: any
}

const BlogIndex: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts: ReadonlyArray<any> = data.allMarkdownRemark.edges
  const { hasNextPage, hasPreviousPage, currentPage } = data.allMarkdownRemark.pageInfo

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <SEO title="ALL POSTS" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <SEO title="ALL POSTS" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return <PostListItem key={post.node.id} post={post}/>
        })}
      </ol>

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
            {hasPreviousPage && (
              <Link to={currentPage === 2 ? `/` : `/${currentPage - 1}`} rel="prev">
                ← 新しい
              </Link>
            )}
          </li>
          <li className="next-prev-title">
            {hasNextPage && (
              <Link to={`/${currentPage + 1}`} rel="next">
                古い →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip 
      ) {
      edges {
        node {
          id          
          fields {
            slug
            tags
          }
          excerpt
          frontmatter {
            date(formatString: "YYYY/M/DD")
            title
            description
          }
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
