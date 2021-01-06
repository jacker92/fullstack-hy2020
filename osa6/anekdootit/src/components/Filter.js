import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterValue } from './../reducers/filterReducer'

const Filter = () => {
    const notification = useSelector(state => state.notifications)
    const dispatch = useDispatch()

  const handleChange = (event) => {
      dispatch(setFilterValue(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter