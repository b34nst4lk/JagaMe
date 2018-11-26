import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Appbar, Button, Card, TextInput, Portal } from 'react-native-paper'
import { connect } from 'react-redux'

import { ProductCard } from '../ProductCard'
import { SubmitDialog } from './SubmitDialog'

class Cart extends Component {
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
        console.log(this.props.cart.values())
        return (
            <View style={{flex: 1}}>
                <Appbar>
                    <Appbar.Content 
                        title="Cart"
                    />
                </Appbar>
                <Portal>
                    <SubmitDialog 
                        visible={this.props.dialogIsVisible}
                        onDismiss={this.dismissDialog}
                    />
                </Portal>
                <FlatList 
                    data={Array.from(this.props.cart)}
                    keyExtractor={(item, index) => item.item.id.toString()}
                    renderItem={({item}) => {
                        console.log(item)
                        return (
                            <ProductCard 
                                item={item.item}
                                onPress={null}
                            >
                                <TextInput 
                                    placeholder='Quantity' 
                                    keyboardType="number-pad"
                                    value={item.quantity.toString()}
                                />
                                <Card.Actions style={{justifyContent: 'flex-end'}}>
                                    <Button>Delete</Button>
                                </Card.Actions>
                            </ProductCard>
                        )}
                    }
                />
                <Appbar>
                    <Appbar.Content 
                        title={'Total Price: $' + this.props.totalPrice}
                    />
                    <Button onPress={() => this.showDialog()}>Submit</Button>
                </Appbar>
            </View>
        )
    }
}

const calculateTotalPrice = (cart) => {
    totalPrice = 0
    for (const [id, item] of Object.entries(cart)) {
        totalPrice += item.quantity * item.price
    }
    return totalPrice
}

const convertCartMapToArray = (cart) => {
    array = new Array()
    for (const [id, item] of Object.entries(cart)) {
        array.push(item)
    }
    return array
}


const mapStateToProps = (state) => {
    return {
        cart: convertCartMapToArray(state.cart),
        dialogIsVisible: state.submitDialogIsVisible,
        totalPrice: calculateTotalPrice(state.cart).toFixed(2)
    }
}

export default connect(mapStateToProps)(Cart)