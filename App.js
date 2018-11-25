import React, { Component } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Catalog } from './pages/catalog/Catalog'
import { Cart } from './pages/cart/Cart'
import { BottomNavigationTabs } from './pages/BottomNavigationTabs'

export default class App extends Component {
    render() {
        return (
            <PaperProvider>
                {/* <Cart /> */}
                {/* <Catalog /> */}
                <BottomNavigationTabs />
            </PaperProvider>
    )}
}