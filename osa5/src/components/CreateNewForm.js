import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

const CreateNewForm = ({ createNew }) => {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()

  const handleSubmit = (e) => {
    createNew(e, { title, author, url })
    titleInput.current.value = ''
    authorInput.current.value = ''
    urlInput.current.value = ''
  }

  const titleInput = useRef()
  const authorInput = useRef()
  const urlInput = useRef()

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
                title:<input type="text" onChange={(e) => setTitle(e.target.value)} ref={titleInput}></input>
                author:<input type="text" onChange={(e) => setAuthor(e.target.value)} ref={authorInput}></input>
                url:<input type="text" onChange={(e) => setUrl(e.target.value)} ref={urlInput}></input>
        <input type="submit" />
      </form>
    </div >
  )
}

CreateNewForm.propTypes = {
  createNew: PropTypes.func.isRequired
}

export default CreateNewForm