/* eslint-disable no-case-declarations */
const filterValue = ''

const reducer = (state = filterValue, action) => {
    switch (action.type) {
        case 'SET_FILTER_VALUE':
            return action.data.message
        default:
            return state
    }
}

export const setFilterValue = (message) => {
    return {
      type: 'SET_FILTER_VALUE',
      data: { message }
    }
  }

export default reducer