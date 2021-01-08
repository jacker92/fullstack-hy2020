import React from 'react'
import AddComment from './AddComment'

const Comments = ({ blog }) => {
  const hasComments = blog.comments && blog.comments.length !== 0

  return (
    <div>
      <h4>Comments</h4>
      <AddComment blog={blog}/>
      {hasComments ?
        <ul>
          {blog.comments.map(comment => (
            <li key={comment._id}>{comment.message}</li>
          ))}
        </ul>
        : null}
    </div>
  )
}

export default Comments