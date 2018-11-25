import React from 'react'
import { Button, Dialog, TextInput } from 'react-native-paper'

export function SubmitDialog(props) {
    return (
        <Dialog
            visible={props.visible}
            onDismiss={() => props.onDismiss()}
        >
            <Dialog.Title>Submit for follow up</Dialog.Title>
            <Dialog.Content>
                <TextInput placeholder="Patient's User ID"></TextInput>
            </Dialog.Content>
            <Dialog.Actions>            
                <Button onPress={() => props.onDismiss()}>Cancel</Button>
                <Button>Submit</Button>
            </Dialog.Actions>
        </Dialog>
    )
}