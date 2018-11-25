import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Appbar, Button, Card, TextInput } from 'react-native-paper'
import { ProductCard } from '../ProductCard'

import { sampleData } from '../../sampleData'

export class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: sampleData
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Appbar>
                    <Appbar.Content 
                        title="Cart"
                    />
                </Appbar>
                <FlatList 
                    data={this.state.products}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => 
                        <ProductCard 
                            name={item.name}
                            price={item.price}
                            img={item.images[0].src}
                        >
                            <TextInput placeholder="Quantity" style={{backgroundColor: 'white'}}/>
                            <Card.Actions style={{justifyContent: 'flex-end'}}>
                                <Button>Delete</Button>
                            </Card.Actions>
                        </ProductCard>
                    }
                />
            </View>
        )
    }
}