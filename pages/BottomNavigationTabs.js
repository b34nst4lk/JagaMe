import * as React from 'react'
import Catalog from './catalog/Catalog'
import { Cart } from './cart/Cart'
import { BottomNavigation } from 'react-native-paper'

const CatalogRoute = () => <Catalog />
const CartRoute = () => <Cart />

export class BottomNavigationTabs extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'catalog', title: 'Catalog', icon: 'list' },
            { key: 'cart', title: 'Cart', icon: 'shopping-cart' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        catalog: CatalogRoute,
        cart: CartRoute,
   });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }
}