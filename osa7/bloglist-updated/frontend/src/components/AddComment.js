import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addComment} from './../reducers/blogReducer'

const AddComment = ({ blog }) => {
  const [comment, setComment] = useState()
  const dispatch = useDispatch()

  console.log('comment is', comment)
  return (
    <div>
      <input type='text' onChange={(e) => setComment(e.target.value)}></input>
      <button onClick={() => dispatch(addComment(blog, comment))}>Add comment</button>
    </div>
  )
}

export default AddComment