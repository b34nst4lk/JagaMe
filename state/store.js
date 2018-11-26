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
    selectedItemQuantity: 1,
    cart: new Map(), // map of item ids and quantity
    submitDialogIsVisible: false,
    submitButtonIsEnabled: false,
    submitDialogButtonIsEnabled: false,
    patientId: '',
}

export const reducer = (state=initialState, action) => {
    newState = Object.assign({}, state)
    switch (action.type) {
        case a.INSERT_SEARCH_RESULTS:
            return newState

        case a.CLEAR_SEARCH_RESULTS:
            return newState

        case a.SHOW_ADD_TO_CART_DIALOG:
            newState.addToCartDialogIsVisible = true
            newState.selectedItem = action.selectedItem
            return newState

        case a.UPDATE_DIALOG_QUANTITY:
            newState.selectedItemQuantity=action.quantity
            return newState

        case a.DISMISS_ADD_TO_CART_DIALOG:
            newState.addToCartDialogIsVisible = false
            newState.selectedItem = null
            newState.selectedItemQuantity = 1
            return newState

        case a.ADD_TO_CART:
            newState.cart.set(action.item.id, {quantity: action.quantity, price: action.price, item: action.item})
            newState.selectedItem = null
            newState.selectedItemQuantity = 1
            newState.addToCartDialogIsVisible = false
            newState.submitButtonIsEnabled = true
            return newState

        case a.SHOW_SUBMIT_DIALOG:
            newState.patientId = ''
            newState.submitDialogIsVisible = true
            newState.submitDialogButtonIsEnabled = false
            return newState

        case a.UPDATE_PATIENT_ID:
            newState.patientId = action.patientId
            if (action.patientId) 
                newState.submitDialogButtonIsEnabled = true
            else 
                newState.submitDialogButtonIsEnabled = false
            return newState

        case a.DISMISS_SUBMIT_DIALOG:
            newState.submitDialogIsVisible = false
            newState.submitDialogButtonIsEnabled = false
            return newState

        case a.UPDATE_ITEM_QUANTITY:
            newState.cart.get(action.id).quantity = action.quantity
            newState.submitButtonIsEnabled = true
            for (const [id, item] of newState.cart.entries()) {
                if (item.quantity === 0 || item.quantity === "") {
                    newState.submitButtonIsEnabled = false
                    break
                }
            }
            return newState
            
        case a.REMOVE_FROM_CART:
            newState.cart.delete(action.id)
            if (newState.cart.size === 0) newState.submitButtonIsEnabled = false
            return newState

        default:
            return newState
    }
}

export const store = createStore(reducer)