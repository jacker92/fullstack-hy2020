import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, setLike, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onMouseEnterParagraph = (e) => {
    e.target.style.color = '#4e5951'
  }

  const onMouseLeaveParagraph = (e) => {
    e.target.style.color = 'black'
  }

  const removeButton = () => {
    if (user && blog.user && user.id.toString() === blog.user.toString()) {
      return (
        <button onClick={() => removeBlog(blog)}>Remove blog</button>
      )
    }
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <p onMouseEnter={onMouseEnterParagraph}
          onMouseLeave={onMouseLeaveParagraph}
          onClick={() => setVisible(!visible)}>
          <b>{blog.title}</b>
        </p>
        {blog.url}<br />
          likes {blog.likes}
        <button
          onClick={() => setLike(blog)}>
          Like
        </button>
        <br />
        {blog.author}
        <br />
        {removeButton()}
      </div>
    )
  }

  return (
    <div>
      <p
        onMouseEnter={onMouseEnterParagraph}
        onMouseLeave={onMouseLeaveParagraph}
        onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </p>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog