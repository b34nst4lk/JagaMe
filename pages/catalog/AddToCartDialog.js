import React from 'react'
import { Button, TextInput, Dialog, Paragraph } from 'react-native-paper'
import { connect } from 'react-redux'
import * as a from '../../state/action'

function AddToCartDialog(props) {
    item = props.item
    name = item === null ? '' : item.name
    description = item === null ? '' : item.description

    return (
        <Dialog
            visible={props.visible} 
            onDismiss={() => props.onDismiss()}
        >
            <Dialog.Title>{name}</Dialog.Title>
            <Dialog.Content>
                <Paragraph>{description}</Paragraph>
                <TextInput 
                    placeholder='Quantity' 
                    keyboardType="number-pad"
                    onChangeText={(text) => props.onUpdateQuantity(text)}
                    value={props.quantity.toString()}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => props.onDismiss()}>Cancel</Button>
                <Button onPress={() => props.onSubmit(props.item, props.quantity)}>Add to Cart</Button>
            </Dialog.Actions>
        </Dialog>
    )
} 

mapStateToProps = (state) => {
    return {
        item: state.selectedItem,
        visible: state.addToCartDialogIsVisible,
        quantity: state.selectedItemQuantity
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        onDismiss: () => dispatch({
            type: a.DISMISS_ADD_TO_CART_DIALOG
        }),
        onUpdateQuantity: (quantity) => dispatch({
            type: a.UPDATE_QUANTITY,
            quantity: quantity
        }),
        onSubmit: (item, quantity) => dispatch({
            type:a.ADD_TO_CART,
            item: item,
            quantity: quantity,
            price: parseFloat(item.price)
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartDialog)