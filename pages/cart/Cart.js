import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Appbar, Button, Card, TextInput } from 'react-native-paper'
import { ProductCard } from '../ProductCard'

import { sampleData } from '../../sampleData'

export class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: sampleData,
            totalPrice: 0
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
                            item={item}
                            onPress={null}
                        >
                            <TextInput 
                                placeholder='Quantity' 
                                keyboardType="number-pad"
                            />
                            <Card.Actions style={{justifyContent: 'flex-end'}}>
                                <Button>Delete</Button>
                            </Card.Actions>
                        </ProductCard>
                    }
                />
                <Appbar>
                    <Appbar.Content 
                        title={'Total Price: $' + this.state.totalPrice.toFixed(2)}
                    />
                    <Button>Submit</Button>
                </Appbar>
            </View>
        )
    }
}