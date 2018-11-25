import React, { Component } from 'react'
import { WebView } from 'react-native'
import { Button, TextInput, Dialog, Paragraph } from 'react-native-paper'

export function AddToCartDialog(props) {
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
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.onDismiss}>Cancel</Button>
                <Button>Add to Cart</Button>
            </Dialog.Actions>
        </Dialog>
    )
} 