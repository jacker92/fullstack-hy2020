import React, { useState, useRef } from 'react'
import { addBlog } from './../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const CreateNewForm = (props) => {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addBlog({ title, author, url }))
    titleInput.current.value = ''
    authorInput.current.value = ''
    urlInput.current.value = ''
    props.toggleVisibility()
  }

  const titleInput = useRef()
  const authorInput = useRef()
  const urlInput = useRef()

  return (
    <div>
      <h2>Create new</h2>
      <Form className="createNew" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control onChange={(e) => setTitle(e.target.value)} type="text" name="title" ref={titleInput}/>
          <Form.Label>Author:</Form.Label>
          <Form.Control onChange={(e) => setAuthor(e.target.value)} type="text" name="author" ref={authorInput}/>
          <Form.Label>URL:</Form.Label>
          <Form.Control onChange={(e) => setUrl(e.target.value)} type="text" name="url" ref={urlInput}/>
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  )
}
export default CreateNewForm