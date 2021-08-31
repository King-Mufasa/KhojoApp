import React from 'react'
import Color from '../styles/color'
import Images from '../styles/images';
import { SafeAreaView, StyleSheet, TextInput, Image, Text } from "react-native";
import KButton from './KButton';

const Speciality = (props) => {
    return (
        <SafeAreaView style={styles.btn}>
            <Image  style={styles.icon} source={props.url}/>
            <Text>{props.title}</Text>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    icon:{
        width:20,
        height:20,
        marginHorizontal:10
    },
    btn:{
        backgroundColor:Color.white,
        borderRadius:5
    }

})

export default Speciality