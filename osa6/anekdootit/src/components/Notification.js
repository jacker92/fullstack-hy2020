import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from './../reducers/notificationReducer'

const Notification = () => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  if (notification) {
    setTimeout(() => dispatch(reset('')), 5000)
    style.borderWidth = 1
  } else {
    style.borderWidth = 0
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification