import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Appbar } from 'react-native-paper';
import { TextInputWithIcon } from './SearchInput'
import { ProductCard } from '../ProductCard'

import { productEndpoint } from '../../config'
import { sampleData } from '../../sampleData'

export class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: sampleData
        }

    }

    // componentDidMount() {
    //     this.getProducts()        
    // }

    // async getProducts() {
    //     // const response = await fetch(productEndpoint).catch()
    //     // const data = await response.json()
    //     this.setState({products: sampleData})
    // }

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
                <TextInputWithIcon
                    placeholder="E.g. Wheelchairs"
                    icon="search"
                />
                <FlatList 
                    data={this.state.products}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => 
                        <ProductCard 
                            name={item.name}
                            price={item.price}
                            img={item.images[0].src}
                        />
                    }
                />
            </View>
        ) 
    }
}