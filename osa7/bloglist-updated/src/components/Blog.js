import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { removeBlog, setLike } from './../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const credential = useSelector(state => state.credential)

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
    if (credential && blog.user && credential.id.toString() === blog.user.toString()) {
      return (
        <button onClick={() => dispatch(removeBlog(blog))}>Remove blog</button>
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
          onClick={() => dispatch(setLike(blog))}>
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
    <div className='blog'>
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
  blog: PropTypes.object.isRequired
}

export default Blog