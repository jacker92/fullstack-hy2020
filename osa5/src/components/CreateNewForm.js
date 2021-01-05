import React, { useState } from 'react'

const CreateNewForm = ({ createNew }) => {
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [url, setUrl] = useState()

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={(e) => createNew(e, { title, author, url })}>
                title:<input type="text" onChange={(e) => setTitle(e.target.value)}></input>
          author:<input type="text" onChange={(e) => setAuthor(e.target.value)}></input>
          url:<input type="text" onChange={(e) => setUrl(e.target.value)}></input>
                <input type="submit" />
            </form>
        </div>
    )
}

export default CreateNewForm