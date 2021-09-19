import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Category from '../../../components/category'
import {StandardStyles} from '../../../styles/standardstyles'
import Images from '../../../styles/images'


const OrderMenu = (props) => {
    const {navigate} = props.navigation
    return (
        <SafeAreaView style={StandardStyles.container}>
            <ScrollView style={styles.container}>
                <Category style={{width:'90%'}} name="My Orders" click={()=>{navigate("OrderList")}} icon={Images.ico_order}/>
                <Category style={{width:'90%'}} name="Request Sent" click={()=>{navigate("RequestList")}} icon={Images.ico_request}/>
                <Category style={{width:'90%'}} name="Booked Service" click={()=>{navigate("ServiceList")}} icon={Images.ico_service}/>
                <Category style={{width:'90%'}} name="Appointment"  click={()=>{navigate("AppointmentList")}}  icon={Images.ico_appointment}/>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:10
    }
})
export default OrderMenu