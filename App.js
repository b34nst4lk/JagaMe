import React, { Component } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Catalog } from './pages/catalog/Catalog'
import { Cart } from './pages/cart/Cart'

export default class App extends Component {
    render() {
        return (
            <PaperProvider>
                <Cart />
                {/* <Catalog /> */}
            </PaperProvider>
    )}
}