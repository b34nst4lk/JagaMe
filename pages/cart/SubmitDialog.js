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
                    onChangeText={(text) => props.onPatientIdChange(text)}
                />
            </Dialog.Content>
            <Dialog.Actions>            
                <Button onPress={() => props.onDismiss()}>Cancel</Button>
                <Button 
                    onPress={() => {}} 
                    disabled={!props.submitIsEnabled}
                >
                    Submit
                </Button>
            </Dialog.Actions>
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    return {
    isVisible: state.submitDialogIsVisible,
        patientId: state.patientId,
        submitIsEnabled: state.submitDialogButtonIsEnabled
    }
}

// TODO: Implememnt Submit
const mapDispatchToProps = (dispatch) => {
    return {
        onDismiss: () => {
            dispatch({
                type: a.DISMISS_SUBMIT_DIALOG
            })
        },
        onPatientIdChange: (patientId) => {
            dispatch({
                type: a.UPDATE_PATIENT_ID,
                patientId: patientId
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitDialog)