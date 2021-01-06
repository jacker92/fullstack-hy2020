import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from './../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  if (notification) {
    setTimeout(() => dispatch(reset('')), 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification