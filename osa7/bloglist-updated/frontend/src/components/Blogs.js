import CreateNewForm from './CreateNewForm'
import Togglable from './Togglable'
import React from 'react'
import DisplayForm from './DisplayForm'

const Blogs = () => {
  return(
    <div>
      <h2>Blogs</h2>
      <DisplayForm />
      <Togglable buttonLabel='Create new blog'>
        <CreateNewForm />
      </Togglable>
    </div>
  )
}

export default Blogs