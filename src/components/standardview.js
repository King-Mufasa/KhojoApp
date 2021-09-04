import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../styles/color'
const StandardView = () => {
    return (
        <View style={styles.container} />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
        paddingHorizontal: 10
    },
})
export default StandardView