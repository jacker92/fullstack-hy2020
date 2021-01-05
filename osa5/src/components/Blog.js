import React, { useState } from 'react'
const Blog = ({ blog, setLike }) => {
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

  if (visible) {
    return (
      <div style={blogStyle}>
        <p onMouseEnter={onMouseEnterParagraph}
          onMouseLeave={onMouseLeaveParagraph}
          onClick={() => setVisible(!visible)}>
          {blog.title}
        </p>
        {blog.url}<br />
          likes {blog.likes}
        <button
          onClick={() => setLike(blog)}>
          Like
            </button>
        <br />
        {blog.author}
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
