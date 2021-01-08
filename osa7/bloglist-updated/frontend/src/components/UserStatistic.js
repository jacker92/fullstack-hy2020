import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const UserStatistic = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(n => n.id === id)

  if (!user) {
    return null
  }
  return (
    <div>
      <h4>Blogs added by {user.username}</h4>
      <Table striped>
        <thead>
          <tr>
            <th>Blog Name</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserStatistic