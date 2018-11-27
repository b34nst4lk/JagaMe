import React from 'react'
import { Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { IconButton } from 'react-native-paper'

export function TextInputWithIcon(props) {
    return (
        <KeyboardAvoidingView behavior="padding"> 
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TextInput
                    mode="flat"
                    style={{
                        flexGrow: 1,
                        backgroundColor: "white",
                        borderRadius: 15,
                        borderColor: "white",
                        padding: 8,
                        margin: 8
                    }}
                    multiline={false}
                    // onChangeText={(text) => props.onChangeText(text)}
                    underlineColorAndroid="rgba(255,255,255,0)"
                    placeholder={props.placeholder}
                >
                    <Text>{props.draft}</Text>
                </TextInput>
                <IconButton
                    onPress={props.onPress}
                    icon={props.icon}
                />
            </View>
        </KeyboardAvoidingView>
    )
}