/* eslint-disable no-case-declarations */
const notification = "Testi"

const reducer = (state = notification, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        default:
            return state
    }
}

export default reducer