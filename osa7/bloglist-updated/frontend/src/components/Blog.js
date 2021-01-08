import React from 'react'
import { removeBlog, setLike } from './../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import { Table, Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const credential = useSelector(state => state.credential)
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) {
    return null
  }

  const removeButton = () => {
    if (credential && blog.user && credential.id.toString() === blog.user.toString()) {
      return (
        <td>
          <Button onClick={() => dispatch(removeBlog(blog))} variant="danger">
            Remove blog
        </Button>
        </td>
      )
    }
  }

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Url</th>
            <th>Likes</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{blog.title}</td>
            <td>{blog.url}</td>
            <td>
              <b>{blog.likes}</b>
            </td>
            <td>{blog.author}</td>
            <td>
              <Button onClick={() => dispatch(setLike(blog))} variant="info">
                Like
              </Button>
            </td>
            {removeButton()}
          </tr>
        </tbody>
        <br />
      </Table>
      <Comments blog={blog} />
    </div>

  )
}
export default Blog