import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import Color from '../styles/color'
import Fontsize from '../styles/fontsize';

const KButton = (props) => {
    return (
        <TouchableHighlight
            style={[styles.button,props.style]}
            onPress={(props.click)}
            underlayColor={Color.primaryClick}>
            <Text style={[styles.submitText,Fontsize.small]}>{props.name}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        backgroundColor: Color.primary,
        borderRadius: 10,
        paddingHorizontal:10
    },
    submitText: {
        fontWeight:'bold',
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        textAlign: 'center',
    }
})


export default KButton;