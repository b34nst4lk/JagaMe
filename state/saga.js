import { call, put, takeLatest, all } from 'redux-saga/effects'
import { productEndpoint, submissionEndpoint } from '../config'
import * as a from './action'

function getSearchResults(queryObj={page: 1, per_page: 10}) {
    let queryStrings = []
    for (const [key, value] of Object.entries(queryObj)) {
        queryStrings.push(key + '=' + value)
    }

    return fetch(productEndpoint + queryStrings.join('&'))
        .then(response => {
            if (response.status >= 400) 
                throw new Error(response.statusText)
            else
                return response.json()
        })
        .then(response => {
            let items = new Array()
            for (const [key, item] of response.entries()) {
                newItem = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    short_description: item.short_description,
                    price: item.price,
                    imageUrl: item.images[0].src
                }
                items.push(newItem)
            }
            return items
        })
}

function* fetchSearchResults(action) {
    queryObj = {
        search: action.searchText || '',
        page: action.page
    }

    try {
        const data = yield call(getSearchResults, queryObj)
        if (action.page === 1) yield put({type: a.CLEAR_SEARCH_RESULTS})
        yield put({...action, type: a.SEARCH_RESULTS_RECEIVED, data})
    } catch (error) {
        yield put({type: a.SEARCH_FAILED})
    }
}

function postSubmitCart(patientId, cart) {
    body = JSON.stringify({patientId, cart: [...cart.values()]})
    return fetch(submissionEndpoint, {
        method: 'POST',
        body
    }).then(response => {
        if (response.status >= 400)
            throw new Error(response.statusText)
    })
}

function* submitCart(action) {
    try {
        const data = yield call(postSubmitCart, action.patientId, action.cart)
        yield put({type: a.CART_SUBMITTED})
    } catch (error) {
        yield put({type: a.CART_NOT_SUBMITTED})
    }
}

export function* rootSaga() {
    yield takeLatest(a.GET_SEARCH_RESULTS, fetchSearchResults)
    yield takeLatest(a.SUBMIT_CART, submitCart)
}