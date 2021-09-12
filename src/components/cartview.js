import React, { useState, useEffect0, } from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenHeight } from '../module/IntroSlider/src/themes';
import Colors from '../styles/color';
import Fontsize from '../styles/fontsize';
import Images from '../styles/images';

const CartView = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'column',alignSelf:'center'}}>
                <Text><Text style={[Fontsize.medium, {color:Colors.white}]}>{props.count}  </Text>Item Selected</Text>
                <Text style={{marginTop:20}}>Total   <Text style={[{color:Colors.white}, Fontsize.small]}><Icon name="inr" /> {props.price}</Text></Text>
            </View>

            <TouchableHighlight onPress={props.click} style={styles.btncreate}>
                <Image source={Images.ico_prescription} />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btncreate: {
        borderRadius: 500,
        // alignSelf: 'baseline'
    }
});


export default CartView