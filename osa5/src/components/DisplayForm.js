import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const DisplayForm = ({ user, blogs, logout, setLike, removeBlog }) => {

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
    <div>
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
  blogs: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  setLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default DisplayForm