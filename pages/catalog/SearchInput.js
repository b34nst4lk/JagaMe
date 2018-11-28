import React from 'react'
import { Keyboard, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { connect } from 'react-redux'

import * as a from '../../state/action'

function SearchInput(props) {
    return (
        <KeyboardAvoidingView behavior="padding"> 
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TextInput
                    mode="flat"
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: 15,
                        borderColor: "white",
                        padding: 8,
                        margin: 8
                    }}
                    multiline={false}
                    underlineColorAndroid="rgba(255,255,255,0)"
                    placeholder="E.g. Wheelchairs"
                    icon="search"
                    onChangeText={(text) => props.onSearchTextChange(text)}
                    value={props.searchText}
                >
                </TextInput>
                <IconButton
                    onPress={() => {
                        Keyboard.dismiss()
                        props.fetchSearchResults(props.searchText)}
                    }
                    icon="search"
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => {
    return {
        searchText: state.searchText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchResults: (searchText) => dispatch({
            type: a.GET_SEARCH_RESULTS,
            searchText: searchText,
            page: 1
        }),
        onSearchTextChange: (searchText) => dispatch({
            type: a.UPDATE_SEARCH_TEXT,
            searchText: searchText,
            page: 1,
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)