import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addComment} from './../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const AddComment = ({ blog }) => {
  const [comment, setComment] = useState()
  const dispatch = useDispatch()

  console.log('comment is', comment)
  return (
    <div>
      <input style={{margin: 10}}type='text' onChange={(e) => setComment(e.target.value)}></input>
      <Button onClick={() => dispatch(addComment(blog, comment))}>Add comment</Button>
    </div>
  )
}

export default AddComment