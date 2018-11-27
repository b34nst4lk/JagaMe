import { call, put, takeLatest, all } from 'redux-saga/effects'
import { productEndpoint } from '../config'
import * as a from './action'
function getSearchResults(queryObj={page: 1, per_page: 10}) {
    let queryStrings = []
    for (const [key, value] of Object.entries(queryObj)) {
        queryStrings.push(key + '=' + value)
    }

    return fetch(productEndpoint + queryStrings.join('&'))
    .then(response => response.json())
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
    console.log('fetch called')
    try {
        const data = yield call(getSearchResults)
        yield put({type: a.SEARCH_RESULTS_RECEIVED, data})
    } catch (error) {
        yield put({type: a.SEARCH_FAILED})
    }
}

function* actionWatcher() {
    yield takeLatest(a.GET_SEARCH_RESULTS, fetchSearchResults)
}

export function* rootSaga() {
    yield all([
        actionWatcher()
    ])
}