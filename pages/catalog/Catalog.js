import React, { Component } from 'react'
import { View, FlatList, WebView } from 'react-native'
import { Appbar, Paragraph, Portal } from 'react-native-paper';
import { TextInputWithIcon } from './SearchInput'
import { ProductCard } from '../ProductCard'
import { AddToCartDialog } from './AddToCartDialog'

import { productEndpoint } from '../../config'
import { sampleData } from '../../sampleData'

export class Catalog extends Component {
    constructor(props) {
        super(props)
        regex = /(<([^>]+)>)/ig
        for (var item of sampleData) {
            item.description = item.description.replace(regex, '')
            item.short_description = item.short_description.replace(regex, '')
        }
        this.state = {
            products: sampleData,
            dialogIsVisible: false,
            selectedItem: null,
            item: null,
        }

        this.showDialog = this.showDialog.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
    }

    // componentDidMount() {
    //     this.getProducts()        
    // }

    // async getProducts() {
    //     // const response = await fetch(productEndpoint).catch()
    //     // const data = await response.json()
    //     this.setState({products: sampleData})
    // }

    showDialog(item) {
        this.setState({
            dialogIsVisible: true,
            selectedItem: item
        })
    }

    hideDialog() {
        this.setState({
            dialogIsVisible: false,
            item: null
        })
    }

    render() {
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
                    <AddToCartDialog 
                        visible={this.state.dialogIsVisible}
                        item={this.state.selectedItem}
                        onDismiss={this.hideDialog}
                    />
                </Portal>
                <TextInputWithIcon
                    placeholder="E.g. Wheelchairs"
                    icon="search"
                />
                <FlatList 
                    data={this.state.products}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => 
                        <ProductCard 
                            item={item}
                            onPress={() => this.showDialog(item)}
                        >
                            <Paragraph>{item.short_description}</Paragraph>
                        </ProductCard>
                    }
                />
            </View>
        ) 
    }
}