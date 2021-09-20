import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const ScheduleItem = (props) => {

    
    return(
        <View>
            <Text>{props.schedule.pure_price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})


export default ScheduleItem