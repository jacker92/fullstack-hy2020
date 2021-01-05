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

test('shows all content with correct values visible after show button pressed', () => {
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