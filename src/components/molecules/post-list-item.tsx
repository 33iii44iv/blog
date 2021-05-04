import React from "react"
import { Link } from "gatsby"
import tagDict from "../functions/tag-dict"

interface Props {
  post: any
}

const PostListItem: React.FC<Props> = ({ post }) => {
  const tags: string[] = post.node.fields.tags
  return (
    <li>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={post.node.fields?.slug} itemProp="url">
              <span itemProp="headline">{post.node.frontmatter?.title || post.node.fields?.slug}</span>
            </Link>
          </h2>
          <div>
            <small className="index-date">{post.node.frontmatter?.date}</small>
            {tags.map(tag => {
              return (
                <small key={tag}>
                  <a href={`/tags/${tag}`} className="tag-label">{tagDict[tag]}</a>
                </small>
              )
            })}
          </div>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.node.frontmatter?.description || post.node.excerpt || ""
            }}
            itemProp="description"
          />
        </section>
      </article>
    </li>
  )
}

export default PostListItem