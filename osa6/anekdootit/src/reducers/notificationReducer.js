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

export const setNotification = (message) => {
    return {
      type: 'SHOW_NOTIFICATION',
      data: { message }
    }
  }

  export const reset = (asdf) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: { message: '' }
      }
  }

export default reducer