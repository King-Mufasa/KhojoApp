import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Category from '../../components/category'
import StandardStyles from '../../styles/standardstyles'



const OrderMenu = (props) => {
    const {navigate} = props.navigation
    return (
        <SafeAreaView style={StandardStyles.container}>
            <ScrollView>
                <Category name="My Orders" />
                <Category name="Request Sent" click={()=>{navigate("RequestList")}}/>
                <Category name="Booked Service" click={()=>{navigate("OrderList")}}/>
                <Category name="Appointment" />
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

})
export default OrderMenu