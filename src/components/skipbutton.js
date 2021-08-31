import React from 'react'
import Color from '../styles/color'
import Images from '../styles/images';
import { SafeAreaView, StyleSheet, TextInput, Image, Text } from "react-native";
import KButton from './KButton';

const SkipButton = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.subcontainer}>
                <Text style={[styles.skip,{display:props.show}]} onPress={props.click}>Skip</Text>
            </SafeAreaView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:Color.primary
    },
    subcontainer:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:"flex-end",
        backgroundColor:Color.white,
        borderTopStartRadius:10,
        borderTopEndRadius:10

    },
    skip: {
        marginTop:20,
        marginEnd:15,
        padding:10,
    }
})
export default SkipButton