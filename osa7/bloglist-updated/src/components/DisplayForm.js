import React from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/credentialReducer'

const DisplayForm = () => {

  const blogs = useSelector(state => state.blogs)
  const credential = useSelector(state => state.credential)

  const dispatch = useDispatch()

  const compareOnLikes = (x, y) => {
    if (x.likes < y.likes) {
      return 1
    }
    if (x.likes > y.likes) {
      return -1
    }
    return 0
  }

  console.log('Blogs content is', blogs)
  return (
    <div id='blogs'>
      <p><b>{credential.username}</b> has logged in</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {blogs
        .sort(compareOnLikes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

}

export default DisplayForm