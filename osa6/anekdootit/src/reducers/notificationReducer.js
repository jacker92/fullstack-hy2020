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

export const setNotification = (message, timeInSeconds) => {
  return async dispatch => {
    console.log(`Setting notification ${message}!`)
    dispatch(
      {
        type: 'SHOW_NOTIFICATION',
        data: {
          message,
          clearCallback: () => {
            return setTimeout(() => {
              dispatch(
                {
                  type: 'CLEAR_NOTIFICATION'
                })
            }, timeInSeconds * 1000)
          }
        }
      })
  }
}
export default reducer