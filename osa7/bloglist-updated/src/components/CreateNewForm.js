import React, { useState, useRef } from 'react'
import { addBlog } from './../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CreateNewForm = () => {
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

    //if (createFormRef.current) {
    //  createFormRef.current.toggleVisibility()
    // }
  }

  const titleInput = useRef()
  const authorInput = useRef()
  const urlInput = useRef()

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        title:<input id='title' type="text" onChange={(e) => setTitle(e.target.value)} ref={titleInput}></input>
                author:<input id='author' type="text" onChange={(e) => setAuthor(e.target.value)} ref={authorInput}></input>
                url:<input id='url' type="text" onChange={(e) => setUrl(e.target.value)} ref={urlInput}></input>
        <input type="submit" />
      </form>
    </div >
  )
}

export default CreateNewForm