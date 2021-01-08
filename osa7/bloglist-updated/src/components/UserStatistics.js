import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { loadUsers } from './../reducers/userReducer'

const UserStatistics = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(x => (
            <UserStatistic key={x.username} user={x}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const UserStatistic = ({ user }) => {
  return(
    <tr>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}


export default UserStatistics