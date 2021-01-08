import React from 'react'
import { useParams } from 'react-router-dom'

const UserStatistic = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)

  if(!user) {
    return null
  }
  console.log('UUSERI', user)
  return(
    <div>
      <h3>{user.username}</h3>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

/*
    <tr>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
*/
export default UserStatistic