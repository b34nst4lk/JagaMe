import React from 'react'
import { Button, Dialog, TextInput } from 'react-native-paper'
import { connect } from 'react-redux'

import * as a from '../../state/action'

function SubmitDialog(props) {
    return (
        <Dialog
            visible={props.isVisible}
            onDismiss={() => props.onDismiss()}
        >
            <Dialog.Title>Submit for follow up</Dialog.Title>
            <Dialog.Content>
                <TextInput 
                    placeholder="Patient's User ID" 
                    value={props.patientId}
                />
            </Dialog.Content>
            <Dialog.Actions>            
                <Button onPress={() => props.onDismiss()}>Cancel</Button>
                <Button>Submit</Button>
            </Dialog.Actions>
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    return {
    isVisible: state.submitDialogIsVisible,
        patientId: state.patientId,
    }
}

// TODO: Implememnt Submit
const mapDispatchToProps = (dispatch) => {
    return {
        onDismiss: () => {
            dispatch({
                type: a.DISMISS_SUBMIT_DIALOG
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitDialog)