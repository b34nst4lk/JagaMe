// Catalog actions
/// Search
export const UPDATE_SEARCH_TEXT = 'Updates the search text when onChangeText in the search textinput'
export const GET_SEARCH_RESULTS = 'Sends search query to product endpoint'
export const SEARCH_RESULTS_RECEIVED = 'Successfully fetching of search results'
export const SEARCH_FAILED = 'Failed to fetch search results'
export const DO_NEW_SEARCH = 'Inserts search results'
export const CLEAR_SEARCH_RESULTS = 'Clears search results'

/// Add to cart
export const SHOW_ADD_TO_CART_DIALOG = 'Shows add to cart dialog'
export const UPDATE_DIALOG_QUANTITY = 'Update quantity text field for selected item in dialog'
export const DISMISS_ADD_TO_CART_DIALOG = 'Dismisses the add to cart dialog'
export const ADD_TO_CART = 'Add selected item with quantity to cart'

// Cart actions
export const REMOVE_FROM_CART = 'Remove selected item from cart'
export const UPDATE_ITEM_QUANTITY = 'Update an item quantity in the cart'
export const SHOW_SUBMIT_DIALOG = 'Show submit dialog'
export const UPDATE_PATIENT_ID = 'Update the patient id in submit dialog'
export const DISMISS_SUBMIT_DIALOG = 'Dismiss submit dialog'
export const SUBMIT_CART = 'Submit cart'
export const CART_SUBMITTED = 'Cart has been successfully submitted'
export const CART_NOT_SUBMITTED = 'Cart was not submitted'
export const DISMISS_SUBMISSION_STATUS = 'Dismiss submission status dialog'