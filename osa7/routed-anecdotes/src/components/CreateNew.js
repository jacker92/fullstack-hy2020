import React, {useState} from 'react'
import {
  Redirect
} from "react-router-dom"
import { useField } from './../hooks/index'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
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

  if(redirectToHome) {
    return <Redirect to='/'/>
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          content
            <input name={content.name} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
            <input name={author.name} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
            <input name={info.name} value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew