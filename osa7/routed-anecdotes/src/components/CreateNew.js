import React, { useState } from 'react'
import {
  Redirect
} from "react-router-dom"
import { useField } from './../hooks/index'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const reset = useField("button")
  const [redirectToHome, setRedirectToHome] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setRedirectToHome(true)
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  if (redirectToHome) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          content
            <input {...content} />
        </div>
        <div>
          author
            <input {...author} />
        </div>
        <div>
          url for more info
            <input {...info} />
        </div>
        <input type='submit'></input>
        <input onClick={() => resetFields()}{...reset} value='reset'></input>
      </form>
    </div>
  )

}


export default CreateNew