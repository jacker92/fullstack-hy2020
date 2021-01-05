import React from 'react'
import Blog from './Blog'

const DisplayForm = ({ user, blogs, logout, setLike }) => {

    return (
        <div><p><b>{user.username}</b> has logged in</p>
            <button onClick={logout}>Logout</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} setLike={setLike} />
            )}
        </div>
    )
}

export default DisplayForm