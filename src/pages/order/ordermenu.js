import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Category from '../../components/category'
import StandardStyles from '../../styles/standardstyles'
import Images from '../../styles/images'


const OrderMenu = (props) => {
    const {navigate} = props.navigation
    return (
        <SafeAreaView style={StandardStyles.container}>
            <ScrollView style={styles.container}>
                <Category name="My Orders" click={()=>{navigate("OrderList")}} icon={Images.ico_order}/>
                <Category name="Request Sent" click={()=>{navigate("RequestList")}} icon={Images.ico_request}/>
                <Category name="Booked Service"  icon={Images.ico_service}/>
                <Category name="Appointment"  icon={Images.ico_appointment}/>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
    }
})
export default OrderMenu