import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import SEO from "../components/seo"

class BlogIndex extends Component {
  render() {
    const { data, pageContext } = this.props;
    const posts = data.allMarkdownRemark.edges
      .filter(({ node }) => node.fields.langKey === 'en');
    const langKey = pageContext.langKey
    console.log(posts, '------', langKey);
    // .filter(item => item.defaultLang === 'en')
    // console.log(data)
    return (
      <Layout>
        {posts.map(({ node }) => {
          console.log(node);
          const post = node.frontmatter;
          return (
            <div key={`${post.title}_${post.date}`}>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                <h2>{post.title} - <i>{post.date}</i></h2>
              </Link>
              <span>category: {post.category}</span>
              <p> {post.spoiler}</p>
              <div dangerouslySetInnerHTML={{ __html: node.html }}></div>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex;
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }

    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            category
          }
        }
      }
    }
  }
`