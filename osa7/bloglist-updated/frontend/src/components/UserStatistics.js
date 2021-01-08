import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { loadUsers } from './../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserStatistics = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
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
                  {x.username}
                </Link>
              </td>
              <td>
                {x.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserStatistics