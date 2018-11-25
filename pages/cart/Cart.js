import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Appbar, Button, Card, TextInput, Portal } from 'react-native-paper'
import { ProductCard } from '../ProductCard'
import { SubmitDialog } from './SubmitDialog'

import { sampleData } from '../../sampleData'

export class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            totalPrice: 0,
            dialogIsVisible: false
        }

        this.dismissDialog = this.dismissDialog.bind(this)
        this.showDialog = this.showDialog.bind(this)
        this.submit = this.submit.bind(this)
    }

    dismissDialog() {
        this.setState({
            dialogIsVisible:false
        })
    }

    showDialog() {
        this.setState({
            dialogIsVisible: true
        })
    }

    submit() {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Appbar>
                    <Appbar.Content 
                        title="Cart"
                    />
                </Appbar>
                <Portal>
                    <SubmitDialog 
                        visible={this.state.dialogIsVisible}
                        onDismiss={this.dismissDialog}
                    />
                </Portal>
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
                    <Button onPress={() => this.showDialog()}>Submit</Button>
                </Appbar>
            </View>
        )
    }
}