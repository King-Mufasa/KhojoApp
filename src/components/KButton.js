import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import { useGlobalState } from '../store/state';
import Color from '../styles/color'
import Fontsize from '../styles/fontsize';

const KButton = (props) => {
    const [doctormode] = useGlobalState('doctormode')
    return (
        <TouchableHighlight
            style={[styles.button,{
                backgroundColor:props.type=="success"?
                Color.success:props.type=="danger"?
                Color.danger:doctormode?Color.doctor_primary:Color.primary
            },props.style,]}
            onPress={(props.click)}
            underlayColor={doctormode?Color.other_2:Color.primaryClick}>
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