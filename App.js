import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { BottomNavigationTabs } from './pages/BottomNavigationTabs'
import { Provider as StoreProvider } from 'react-redux'
import { store } from './state/store'

export default function App(props) {
    return (
        <StoreProvider store={store}>            
            <PaperProvider>
                <BottomNavigationTabs />
            </PaperProvider>
        </StoreProvider>
    )
}