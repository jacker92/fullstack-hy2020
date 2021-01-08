/* eslint-disable no-case-declarations */
const notification = ''

const reducer = (state = notification, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    if (state.timeoutID) {
      clearTimeout(state.timeoutID)
    }
    const timeoutID = action.data.clearCallback()
    return { ...action.data, timeoutID: timeoutID }
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

const setNotification = ( message, type) => {
  return async dispatch =>  {
    dispatch(
      {
        type: 'SHOW_NOTIFICATION',
        data: {
          message,
          type,
          clearCallback: () => {
            return setTimeout(() => {
              dispatch(
                {
                  type: 'CLEAR_NOTIFICATION'
                })
            }, 5000)
          }
        }
      })
  }
}

export const setError = (message) => {
  return setNotification(message, 'danger')
}

export const setSuccess = (message) => {
  return setNotification(message, 'success')
}

export default reducer