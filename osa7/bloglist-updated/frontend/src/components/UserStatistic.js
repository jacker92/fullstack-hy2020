import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserStatistic = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(n => n.id === id)


  if(!user) {
    return null
  }
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

export default UserStatistic