import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Appbar, Paragraph, Portal, Subheading } from 'react-native-paper'
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
                <SearchResults {...this.props} />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <SearchStatus {...this.props}/>
                </View>
             </View>
        ) 
    }
}

function SearchResults(props) {
    if (props.searchResults.length > 0)
        return (
            <FlatList 
                data={props.searchResults}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({item}) => 
                    <ProductCard 
                        item={item}
                        onPress={() => props.showDialog(item)}
                    >
                        <Paragraph>{item.short_description}</Paragraph>
                    </ProductCard>
                }
                onEndReached={() => 
                    !props.reachedEnd 
                    ?props.fetchSearchResults(props.searchText, props.page + 1) 
                    : {}
                }
            /> 
        ) 
    else
        return null
}

function SearchStatus(props) {
    if (props.loading)
        return <ActivityIndicator size='large' style={{padding: 8}}/>

    else if (props.reachedEnd && props.searchResults.length === 0) 
        return <Subheading style={{padding: 8}}>No results found</Subheading>

    else if (props.reachedEnd && props.searchResults.length > 0)
        return <Subheading style={{padding: 8}}>No more results</Subheading>

    else 
        return null
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.searchResults.map(itemId => state.products[itemId]),
        dialogIsVisible: state.addToCartDialogIsVisible,
        selectedItem: state.selectedItem,
        searchText: state.searchText,
        page: state.page,
        reachedEnd: state.reachedEnd,
        loading: state.isLoadingSearchResults,
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