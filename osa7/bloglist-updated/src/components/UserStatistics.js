import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { loadUsers } from './../reducers/userReducer'
import UserStatistic from './UserStatistic'
import { Link } from 'react-router-dom'

const UserStatistics = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  return (
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
            <tr key={x.username}>
              <td>
                <Link to={`/users/${x.id}`} >
                  <td>{x.username}</td>
                </Link>
              </td>
              <td>
                {x.blogs.length}
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserStatistics