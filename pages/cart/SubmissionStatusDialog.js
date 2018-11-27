import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Button, Dialog, Subheading } from 'react-native-paper'
import { connect } from 'react-redux'

import * as a from '../../state/action'

function SubmissionStatusDialog(props) {
    return (
        <Dialog
            visible={props.isVisible} 
            dismissable={false}
        >
            <SubmissionTitle {...props} />
            <SubmissionMessage {...props} />
            <SubmissionButtons {...props} />
        </Dialog>
    )
}

function SubmissionTitle(props) {
    title = ''
    switch (props.status) {
        case 'WAITING':
            title = 'Please wait...'
            break
        case 'SUCCESS':
            title = 'Done!'
            break
        case 'FAILED':
            title = 'Sorry!'
            break
    }

    return (
        <Dialog.Title>
            {title}
        </Dialog.Title>
    )
}

function SubmissionMessage(props) {
    let message = switchCase(
        props.status,
        'Your submission is being processed.',
        'Your submission has been completed',
        'Your submission has failed.'
    )

    return (
        <Dialog.Content style={{flexDirection: 'row'}}>
            {props.status === 'WAITING' ? <ActivityIndicator style={{paddingHorizontal: 8}} /> : null}
            <Subheading>{message}</Subheading>
        </Dialog.Content>
    )
}

function SubmissionButtons(props) {
    okButton = <Button key='ok' onPress={() => props.dismissDialog()}>Ok</Button>
    retryButton = <Button key='retry' onPress={() => props.retry(props.cart, props.patientId)}>Retry</Button>
    cancelButton = <Button key='cancel' onPress={() => props.dismissDialog()}>Cancel</Button>

    buttons = switchCase(props.status, null, okButton, [cancelButton, retryButton])

    return (
        <Dialog.Actions>
            {buttons}
        </Dialog.Actions>
    )
}

function switchCase(status, ifWaiting, ifSuccess, ifFailed) {
    switch (status) {
        case 'WAITING':
            return ifWaiting
        case 'SUCCESS':
            return ifSuccess
        case 'FAILURE':
            return ifFailed
    }
}

const mapStateToProps = (state) => {
    return {
        isVisible: state.awaitSubmissionDialogIsVisible,
        status: state.submissionStatus,
        cart: state.cart,
        patientId: state.patiendId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dismissDialog: () => dispatch({
            type: a.DISMISS_SUBMISSION_STATUS,
        }),
        retry: (cart, patientId) => dispatch({
            type: a.SUBMIT_CART,
            cart: cart,
            patientId: patientId
        }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionStatusDialog)