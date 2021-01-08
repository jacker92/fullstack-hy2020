import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  console.log('In notification', notification)
  if(!notification.message) {
    return null
  }

  const className = notification.type === 'error' ? 'error' : 'success'
  return (
    <div className={className}>
      {notification.message}
    </div>
  )
}

export default Notification