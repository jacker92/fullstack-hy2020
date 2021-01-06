import React, {useState} from 'react'
import {
  Redirect
} from "react-router-dom"

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const [redirectToHome, setRedirectToHome] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    setRedirectToHome(true)
  }

  if(redirectToHome) {
    return <Redirect to='/'/>
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
            <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew