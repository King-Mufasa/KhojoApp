import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import Avatar from './avatar'
import LightLabel from './lightlabel'


const VendorDetails = (props) => {
    return (
        <View style={styles.container}>
            <Avatar image={props.vendor.image} />
            <View style={styles.infoview}>
                <Text>{props.vendor.name}</Text>
                <LightLabel text="Address"/>
                <Text>{props.vendor.address}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10
    },
    infoview: {
        alignSelf:'center'
    }
})


export default VendorDetails