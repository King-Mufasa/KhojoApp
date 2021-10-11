import React from 'react'
import { SafeAreaView, Text, TextInput, StyleSheet } from "react-native"
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'

const EditView = (props) => {
    return (
        <SafeAreaView style={props.style}>
            <Text style={[Fontsize.small, { marginTop: 20 }]}>{props.label}</Text>
            <TextInput
                style={[styles.input, Fontsize.small]}
                keyboardType={props.type}
                // value={props.value ? props.value : ""}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightgrey,
        paddingHorizontal: 20
    },
})

export default EditView