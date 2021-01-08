import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const DisplayForm = () => {

  const blogs = useSelector(state => state.blogs)

  const compareOnLikes = (x, y) => {
    if (x.likes < y.likes) {
      return 1
    }
    if (x.likes > y.likes) {
      return -1
    }
    return 0
  }

  return (
    <div id='blogs'>
      <Table striped>
      <thead>
          <tr>
            <th>Blog</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .sort(compareOnLikes)
            .map(blog =>
              <tr key={blog.id} className='blog'>
                <td>
                  <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
                <td>
                  {blog.author}
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default DisplayForm