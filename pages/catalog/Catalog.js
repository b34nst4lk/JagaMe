import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Appbar, Paragraph, Portal } from 'react-native-paper'
import { connect } from 'react-redux'

import { TextInputWithIcon } from './SearchInput'
import { ProductCard } from '../ProductCard'
import AddToCartDialog from './AddToCartDialog'

import * as a from '../../state/action'
import { fetchSearchResults } from '../../state/saga'

class Catalog extends Component {
    componentDidMount() {
        this.props.fetchSearchResults()
    }

    render() {
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
                    onPress={() => this.props.fetchSearchResults()}
                />
                <FlatList 
                    data={this.props.searchResults}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => 
                        <ProductCard 
                            item={item}
                            onPress={() => this.props.showDialog(item)}
                        >
                            <Paragraph>{item.short_description}</Paragraph>
                        </ProductCard>
                    }
                />
            </View>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.searchResults.map(itemId => state.products[itemId]),
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
        hideDialog: () => dispatch({
            type: a.DISMISS_ADD_TO_CART_DIALOG
        }),
        fetchSearchResults: () => dispatch({
            type: a.GET_SEARCH_RESULTS
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)