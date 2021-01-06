/* eslint-disable no-case-declarations */
const notification = ''

const reducer = (state = notification, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.data.message
  default:
    return state
  }
}

export const setNotification = (message, timeInSeconds) => {
  return async dispatch => {
    dispatch(
      {  type: 'SHOW_NOTIFICATION',
        data: { message }
      })

    setTimeout(() => {
      dispatch(
        {
          type: 'SHOW_NOTIFICATION',
          data: { message: '' }
        })
    }, timeInSeconds * 1000)

  }
}

export const reset = () => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message: '' }
  }
}

export default reducer