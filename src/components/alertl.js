import React from 'react'
import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Modal = () => {
    const showAlert = () => {
        Alert.alert("message")
    }

    return (
        <TouchableOpacity onPress={showAlert} style={styles.button}>
            <Text>Alert</Text>
        </TouchableOpacity>
    )
}

export default Modal

const styles = StyleSheet.create{
    Button: {
        backgroundColor: '#4ba37b',
        width: 100,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 100
    }
}