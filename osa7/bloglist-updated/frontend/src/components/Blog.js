import React from 'react'
import { removeBlog, setLike } from './../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from './Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const credential = useSelector(state => state.credential)
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = () => {
    if (credential && blog.user && credential.id.toString() === blog.user.toString()) {
      return (
        <button onClick={() => dispatch(removeBlog(blog))}>Remove blog</button>
      )
    }
  }

  return (
    <div style={blogStyle}>
      <p>
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
      <Comments blog={blog} />
    </div>
  )
}
export default Blog