import React from 'react'
import Blog from './Blog'

const DisplayForm = ({ user, blogs, logout }) => {
    return (
        <div><p><b>{user.username}</b> has logged in</p>
            <button onClick={logout}>Logout</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default DisplayForm