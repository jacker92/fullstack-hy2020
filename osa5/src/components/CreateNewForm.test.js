import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNewForm from './CreateNewForm'

test('CreateNewForm calls callback func when blog is created and form is submitted', () => {
  const createNew = jest.fn()

  const component = render(
    <CreateNewForm createNew={createNew} />
  )

  const blog = {
    title: 'testi',
    author: 'tekija',
    url: 'google'
  }
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value:blog.title }
  })

  fireEvent.change(authorInput, {
    target: { value:blog.author }
  })

  fireEvent.change(urlInput, {
    target: { value:blog.url }
  })

  fireEvent.submit(form)

  expect(createNew.mock.calls).toHaveLength(1)
  expect(createNew.mock.calls[0][1].title).toBe(blog.title)
  expect(createNew.mock.calls[0][1].author).toBe(blog.author)
  expect(createNew.mock.calls[0][1].url).toBe(blog.url)
})