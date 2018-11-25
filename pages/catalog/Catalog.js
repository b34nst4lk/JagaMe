import React from 'react'
import { View, FlatList } from 'react-native'
import { Appbar, Paragraph, Portal } from 'react-native-paper';
import { connect } from 'react-redux'

import { TextInputWithIcon } from './SearchInput'
import { ProductCard } from '../ProductCard'
import AddToCartDialog from './AddToCartDialog'

import { productEndpoint } from '../../config'
import * as a from '../../state/action'

function Catalog(props) {
    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title="Catalog" />
                <Appbar.Action icon="filter-list" />
            </Appbar.Header>
            <Portal>
                <AddToCartDialog />
            </Portal>
            <TextInputWithIcon
                placeholder="E.g. Wheelchairs"
                icon="search"
            />
            <FlatList 
                data={props.products}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({item}) => 
                    <ProductCard 
                        item={item}
                        onPress={() => props.showDialog(item)}
                    >
                        <Paragraph>{item.short_description}</Paragraph>
                    </ProductCard>
                }
            />
        </View>
    ) 
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        searchResults: state.searchResults,
        dialogIsVisible: state.addToCartDialogIsVisible,
        selectedItem: state.selectedItem
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: () => dispatch(a.ADD_TO_CART),
        showDialog: (item) => dispatch({
            type: a.SHOW_ADD_TO_CART_DIALOG,
            selectedItem: item
        }),
        hideDialog: () => dispatch(a.DISMISS_ADD_TO_CART_DIALOG)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)