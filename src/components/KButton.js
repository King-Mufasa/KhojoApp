import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import Color from '../styles/color'


const KButton = (props) => {
    return (
        <TouchableHighlight
            style={styles.button}
            onPress={(props.click)}
            underlayColor={Color.white}>
            <Text style={styles.submitText}>{props.name}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
    },
    submitText: {
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        textAlign: 'center',
        backgroundColor: Color.primary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    }
})


export default KButton;