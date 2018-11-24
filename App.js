import React, { Component } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Catalog } from './pages/catalog/Catalog'


export default class App extends Component {
    render() {
        return (
            <PaperProvider>
                <Catalog></Catalog>
            </PaperProvider>
    )}
}