import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notifications)

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: notification ? 1 : 0
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification