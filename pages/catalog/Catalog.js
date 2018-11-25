import React, { Component } from 'react'
import { View, FlatList, WebView } from 'react-native'
import { Appbar, Paragraph, Portal } from 'react-native-paper';
import { connect } from 'react-redux'

import { TextInputWithIcon } from './SearchInput'
import { ProductCard } from '../ProductCard'
import { AddToCartDialog } from './AddToCartDialog'

import { productEndpoint } from '../../config'
import { sampleData } from '../../sampleData'
import * as a from '../../state/action'

class Catalog extends Component {
    // componentDidMount() {
    //     this.getProducts()        
    // }

    // async getProducts() {
    //     // const response = await fetch(productEndpoint).catch()
    //     // const data = await response.json()
    //     this.setState({products: sampleData})
    // }

    // showDialog(item) {
    //     this.setState({
    //         dialogIsVisible: true,
    //         selectedItem: item
    //     })
    // }

    // hideDialog() {
    //     this.setState({
    //         dialogIsVisible: false,
    //         item: null
    //     })
    // }
    render() {
        console.log(this.props)
        return (
            <View style={{flex: 1}}>
                <Appbar.Header>
                    <Appbar.Content 
                        title="Catalog"
                    />
                    <Appbar.Action
                        icon="filter-list"
                    />
                </Appbar.Header>
                <Portal>
                    {/* <AddToCartDialog 
                        visible={this.props.dialogIsVisible}
                        item={this.props.selectedItem}
                        onDismiss={this.hideDialog}
                    /> */}
                </Portal>
                <TextInputWithIcon
                    placeholder="E.g. Wheelchairs"
                    icon="search"
                />
                <FlatList 
                    data={this.props.products}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => 
                        <ProductCard 
                            item={item}
                            // onPress={() => this.showDialog(item)}
                        >
                            <Paragraph>{item.short_description}</Paragraph>
                        </ProductCard>
                    }
                />
            </View>
        ) 
    }
}

const mapStateToProps = (state, ownProps) => {
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
        showDialog: () => dispatch(a.SHOW_ADD_TO_CART_DIALOG),
        hideDialog: () => dispatch(a.DISMISS_ADD_TO_CART_DIALOG)
    }
}

export default connect(mapStateToProps)(Catalog)