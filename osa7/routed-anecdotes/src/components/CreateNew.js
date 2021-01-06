import React, { useState } from 'react'
import {
  Redirect
} from "react-router-dom"
import { useField } from './../hooks/index'

const CreateNew = (props) => {
  const {reset: reset1, ...content} = useField('text')
  const {reset: reset2, ...author} = useField('text')
  const {reset: reset3, ...info} = useField('text')
  const {reset: reset4, ...rs} = useField('button')
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

  const resetFields = (e) => {
    reset1()
    reset2()
    reset3()
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
        <button onClick={(e) => resetFields(e)}{...rs}>reset</button>
      </form>
    </div>
  )

}


export default CreateNew