import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DisplayForm = () => {

  const blogs = useSelector(state => state.blogs)

  const onMouseEnterParagraph = (e) => {
    e.target.style.color = '#4e5951'
  }

  const onMouseLeaveParagraph = (e) => {
    e.target.style.color = 'black'
  }

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
    <div id='blogs'>
      {blogs
        .sort(compareOnLikes)
        .map(blog =>
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div className='blog'>
              <p
                onMouseEnter={onMouseEnterParagraph}
                onMouseLeave={onMouseLeaveParagraph}>
                {blog.title} {blog.author}
              </p>
            </div>
          </Link>

        )}
    </div>
  )
}

export default DisplayForm