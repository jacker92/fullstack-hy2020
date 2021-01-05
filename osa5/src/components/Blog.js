import React, { useState } from 'react'
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
    e.target.style.color = '#4e5951';
  }

  const onMouseLeaveParagraph = (e) => {
    e.target.style.color = 'black';
  }

  const removeButton = () => {
    if (user.id.toString() === blog.user.toString()) {
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

export default Blog
