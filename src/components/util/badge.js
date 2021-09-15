import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import Colors from '../../styles/color';
import Fontsize from '../../styles/fontsize';
import OrderStatus from '../../assets/array/orderstatus';
const Badge = (props) => {
    console.log(props.status)
    return (
        <TouchableHighlight
            style={[styles.button,
                {backgroundColor:
                    OrderStatus[props.status+1].backgroundColor
                }]}
            onPress={(props.click)}
            underlayColor={Colors.white}>
            <Text style={[styles.submitText,Fontsize.mini,{
                color:
                OrderStatus[props.status+1].color
                }]}>{OrderStatus[props.status+1].description}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor:Colors.primaryBack,
        borderRadius: 10,
        paddingHorizontal:10,
        paddingVertical:3,
        alignSelf:'baseline',
    },
    submitText: {
        textAlign: 'center',
    }
})


export default Badge;