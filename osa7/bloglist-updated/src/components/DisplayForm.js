import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const DisplayForm = ({ user, logout, setLike, removeBlog }) => {

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

  console.log(blogs)
  return (
    <div id='blogs'>
      <p><b>{user.username}</b> has logged in</p>
      <button onClick={logout}>Logout</button>
      {blogs
        .sort(compareOnLikes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} setLike={setLike} user={user} removeBlog={removeBlog} />
        )}
    </div>
  )

}

DisplayForm.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  setLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default DisplayForm