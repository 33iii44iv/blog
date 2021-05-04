import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/organisms/layout"
import SEO from "../components/atoms/seo"
import Bio from "../components/atoms/bio"
import PostListItem from "../components/molecules/post-list-item"
import tagDict from "../components/functions/tag-dict"

interface Props {
  data: any
  location: any
  pageContext: any
}

const CategoryTemplate: React.FC<Props> = ({ location, pageContext, data }) => {
  const posts: ReadonlyArray<any> = data.allMarkdownRemark.edges
  const { tag } = pageContext

  return (
    <Layout location={location} title={`${tagDict[tag]}`}>
      <SEO title={`${tagDict[tag]}`} />
      <Bio />
      <h1>{tagDict[tag]}</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return <PostListItem key={post.node.id} post={post}/>
        })}
      </ol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
    }
  }
`

export default CategoryTemplate