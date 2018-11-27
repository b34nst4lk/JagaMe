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
    let message = ''
    switch (props.status) {
        case 'WAITING':
            message = 'Your submission is being processed.'
            break 
        case 'SUCCESS':
            message = 'Your submission has been completed'
            break
        case 'FAILED':
            message = 'Your submission has failed.'
            break
    }

    return (
        <Dialog.Content style={{flexDirection: 'row'}}>
            {props.status === 'WAITING' ? <ActivityIndicator style={{paddingHorizontal: 8}} /> : null}
            <Subheading>{message}</Subheading>
        </Dialog.Content>
    )
}

function SubmissionButtons(props) {
    buttons = null
    okButton = <Button key='ok' onPress={() => props.dismissDialog()}>Ok</Button>
    retryButton = <Button key='retry' onPress={() => props.retry(props.cart, props.patientId)}>Retry</Button>
    cancelButton = <Button key='cancel' onPress={() => props.dismissDialog()}>Cancel</Button>

    switch (props.status) {
    case 'WAITING':
        buttons = null
        break
    case 'SUCCESS':
        buttons = okButton
        break
    case 'FAILED':
        buttons = [cancelButton, retryButton]
        break
    }

    return (
        <Dialog.Actions>
            {buttons}
        </Dialog.Actions>
    )
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