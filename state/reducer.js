import * as a from './action'

function removeHtmlTagsFromDescription(data) {
    regex = /(<([^>]+)>|&nbsp;)/ig
    for (var item of data) {
        item.description = item.description.replace(regex, '')
        item.short_description = item.short_description.replace(regex, '')
    }
    data = Array.from(data)
    
    return data
}

initialState = {
    products: new Map(), // map of all queried items, with id as key
    searchText: '',
    isLoadingSearchResults: false,
    searchResults: [], // list of item ids 
    reachedEnd: false,
    addToCartDialogIsVisible: false,
    selectedItem: null,
    selectedItemQuantity: 1,
    cart: new Map(), // map of item ids and quantity
    submitDialogIsVisible: false,
    submitButtonIsEnabled: false,
    submitDialogButtonIsEnabled: false,
    patientId: '',
    awaitSubmissionDialogIsVisible: false,
    submissionStatus: 'NONE',
}

export const reducer = (state=initialState, action) => {
    newState = Object.assign({}, state)
    switch (action.type) {
        case a.UPDATE_SEARCH_TEXT:
            newState.searchText = action.searchText
            return newState

        case a.GET_SEARCH_RESULTS:
            newState.isLoadingSearchResults = true
            return newState

        case a.SEARCH_RESULTS_RECEIVED:
            newState.isLoadingSearchResults = false

            searchResultData = removeHtmlTagsFromDescription(action.data)
            if (searchResultData.length === 0) {
                newState.reachedEnd = true
            } else {
                newState.reachedEnd = false
            }
            for (const item of searchResultData) {
                newState.products[item.id] = item
            }

            newState.page = action.page || 1
            if (action.page === 1) {
                newState.searchResults = []
            }

            searchResultData.map(item => newState.searchResults.push(item.id))
            return newState

        case a.SEARCH_FAILED:
            newState.isLoadingSearchResults = false
            return newState

        case a.CLEAR_SEARCH_RESULTS:
            newState.searchResults = []
            return newState

        case a.SHOW_ADD_TO_CART_DIALOG:
            newState.addToCartDialogIsVisible = true
            newState.selectedItem = action.selectedItem
            newState.selectedItemQuantity = 1
            return newState

        case a.UPDATE_DIALOG_QUANTITY:
            newState.selectedItemQuantity=action.quantity
            return newState

        case a.DISMISS_ADD_TO_CART_DIALOG:
            newState.addToCartDialogIsVisible = false
            return newState

        case a.ADD_TO_CART:
            newState.cart.set(action.item.id, {quantity: action.quantity, price: action.price, item: action.item})
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

        case a.SUBMIT_CART:
            newState.submitDialogIsVisible = false
            newState.awaitSubmissionDialogIsVisible = true
            newState.submissionStatus = 'WAITING'
            return newState

        case a.CART_SUBMITTED:
            newState.submissionStatus = 'SUCCESS'
            newState.cart = new Map()
            newState.patientId = ''
            return newState

        case a.CART_NOT_SUBMITTED:
            newState.submissionStatus = 'FAILED'
            return newState

        case a.DISMISS_SUBMISSION_STATUS:
            newState.awaitSubmissionDialogIsVisible = false
            return newState

        default:
            return newState
    }
}
