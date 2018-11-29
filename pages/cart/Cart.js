import React from 'react'
import { FlatList, Keyboard, View } from 'react-native'
import { Appbar, Button, Card, TextInput, Portal } from 'react-native-paper'
import { connect } from 'react-redux'

import { ProductCard } from '../ProductCard'
import SubmitDialog from './SubmitDialog'
import * as a from '../../state/action'

function Cart(props) {
    return (
        <View style={{flex: 1}}>
            <Appbar>
                <Appbar.Content title="Cart" />
            </Appbar>
            <Portal>
                <SubmitDialog />
            </Portal>
            <FlatList 
                data={Array.from(props.cart)}
                keyExtractor={(item, index) => item.item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <ProductCard 
                            item={item.item}
                            onPress={null}
                        >
                            <TextInput 
                                placeholder='Quantity must be more than 0' 
                                keyboardType="number-pad"
                                value={item.quantity.toString()}
                                onChangeText={(text) => props.onUpdateQuantity(item.item.id, text)}
                            />
                            <Card.Actions style={{justifyContent: 'flex-end'}}>
                                <Button onPress={() => props.removeFromCart(item.item.id)}>Delete</Button>
                            </Card.Actions>
                        </ProductCard>
                    )}
                }
            />
            <Appbar>
                <Appbar.Content title={'Total Price: $' + props.totalPrice} />
                <Button 
                    onPress={() => {
                        Keyboard.dismiss()
                        props.showDialog()
                    }}
                    disabled={!props.submitIsEnabled}
                >
                    Submit
                </Button>
            </Appbar>
        </View>
    )
}

const calculateTotalPrice = (cart) => {
    totalPrice = 0
    for (const [id, item] of cart.entries()) {
        totalPrice += item.quantity * item.price
    }
    return totalPrice
}

const convertCartMapToArray = (cart) => {
    array = new Array()
    for (const [id, item] of cart.entries()) {
        array.push(item)
    }
    return array
}

const mapStateToProps = (state) => {
    return {
        cart: convertCartMapToArray(state.cart),
        totalPrice: calculateTotalPrice(state.cart).toFixed(2),
        submitIsEnabled: state.submitButtonIsEnabled,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateQuantity: (itemId, quantity) => {
            dispatch({
                type: a.UPDATE_ITEM_QUANTITY,
                id: itemId,
                quantity: parseInt(quantity) || '',
            })
        },
        showDialog: () => {
            dispatch({
                type: a.SHOW_SUBMIT_DIALOG,
            })
        },
        removeFromCart: (itemId) => {
            dispatch({
                type: a.REMOVE_FROM_CART,
                id: itemId
            })
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)