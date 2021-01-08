import React from 'react'

const Comments = ({ blog }) => {
    if (!blog.comments || blog.comments.length == 0) {
      return null
    }
  
    return (
      <div>
        <h4>Comments</h4>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment.message}</li>
          ))}
        </ul>
      </div>
    )
  }

  export default Comments