import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
// import Helmet from 'react-helmet';

class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    // const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next, translations, translationLinks } = this.props.pageContext;
    console.log(post, this.props.pageContext, '-+++')
    const hasTrans = translations.length > 0;
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <p>spoiler: {post.frontmatter.spoiler}</p>
        <p>
          {translations.map(item => <span key={item}>
            {/* {console.log(item, translationLinks[item],'------____')} */}
            <Link to={translationLinks[item]} rel="translations">
              {item} /
            </Link>
          </span>)}
        </p>
        <span>category: {post.frontmatter.category}</span>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        {!hasTrans && previous && (
          <Link
            to={previous.fields.slug}
            rel="prev"
            style={{ marginRight: 20 }}
          >
            ← {previous.frontmatter.title}
          </Link>
        )}
        {!hasTrans && next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </div>
    )
  }
}

export default BlogPostTemplate;

export const postQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
        category
      }
      fields {
        slug
      }
    }
  }
`
