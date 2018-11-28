import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Appbar, Paragraph, Portal, Text } from 'react-native-paper'
import { connect } from 'react-redux'

import SearchInput from './SearchInput'
import { ProductCard } from '../ProductCard'
import AddToCartDialog from './AddToCartDialog'

import * as a from '../../state/action'
import SubmissionStatusDialog from '../cart/SubmissionStatusDialog';

class Catalog extends Component {
    componentDidMount() {
        this.props.fetchSearchResults()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Appbar.Header>
                    <Appbar.Content title="Catalog" />
                </Appbar.Header>
                <Portal>
                    <AddToCartDialog />
                    <SubmissionStatusDialog />
                </Portal>
                <SearchInput />
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
                    onEndReached={() => 
                        !this.props.reachedEnd 
                        ?this.props.fetchSearchResults(this.props.searchText, this.props.page + 1) 
                        : {}
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
        selectedItem: state.selectedItem,
        searchText: state.searchText,
        page: state.page,
        reachedEnd: state.reachedEnd,
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
        fetchSearchResults: (searchText, page=1) => dispatch({
            type: a.GET_SEARCH_RESULTS,
            searchText: searchText,
            page: page,
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)