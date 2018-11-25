import { createStore } from 'redux'
import * as a from './action'
import { sampleData } from '../sampleData'

searchResults = []
for (var item of sampleData) {
    searchResults.push(item.id)
}

initialState = {
    products: sampleData, // map of all queried items, with id as key
    searchResults: sampleData, // list of item ids 
    addToCartDialogIsVisible: false,
    selectedItem: null,
    cart: {}, // map of item ids and quantity
    submitDialogIsVisible: false,
}
console.log(initialState)

export const reducer = (state=initialState, action) => {
    console.log(action)
    console.log("initialState: "+ state)
    newState = Object.assign({}, state)
    switch (action.type) {
        case a.INSERT_SEARCH_RESULTS:
            return newState

        case a.CLEAR_SEARCH_RESULTS:
            return newState

        case a.SHOW_ADD_TO_CART_DIALOG:
            newState.addToCartDialogIsVisible = true
            selectedItem = action.item
            return newState

        case a.DISMISS_ADD_TO_CART_DIALOG:
            newState.addToCartDialogIsVisible = false
            return newState

        case a.ADD_TO_CART:
            newState.cart[action.item.id.toString()] = action.quantity
            newState.selectedItem = null
            newState.addToCartDialogIsVisible = false
            return newState

        case a.REMOVE_FROM_CART:
            return newState

        default:
            return newState
    }
}

console.log(reducer)
export const store = createStore(reducer)