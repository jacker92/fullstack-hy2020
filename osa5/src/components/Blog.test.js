import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content with correct values visible', () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Tester',
    url: 'google.fi',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    blog.title
  )

  expect(component.container).toHaveTextContent(
    blog.author
  )

  expect(component.container).not.toHaveTextContent(
    blog.url
  )

  expect(component.container).not.toHaveTextContent(
    blog.likes
  )
})

test('shows all content with correct values visible after blog title is pressed', () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Tester',
    url: 'google.fi',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogTitle = component.getByText(`${blog.title} ${blog.author}`)
  fireEvent.click(blogTitle)

  expect(component.container).toHaveTextContent(
    blog.title
  )

  expect(component.container).toHaveTextContent(
    blog.author
  )

  expect(component.container).toHaveTextContent(
    blog.url
  )

  expect(component.container).toHaveTextContent(
    blog.likes
  )
})

test('if blog like button pressed twice then expect eventhandler to be called twice', () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Tester',
    url: 'google.fi',
    likes: 5
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} setLike={mockHandler} />
  )

  const blogTitle = component.getByText(`${blog.title} ${blog.author}`)
  fireEvent.click(blogTitle)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})