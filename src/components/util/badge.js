import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import Colors from '../../styles/color';
import Fontsize from '../../styles/fontsize';

const Badge = (props) => {
    console.log(props)
    return (
        <TouchableHighlight
            style={[styles.button,{backgroundColor:props.status==0?Colors.lightdark:props.status==-1?Colors.danger:props.status==2?Colors.success:Colors.lightblue}]}
            onPress={(props.click)}
            underlayColor={Colors.white}>
            <Text style={[styles.submitText,Fontsize.mini,{color:props.status==0?Colors.white:props.status==-1?Colors.white:props.status==2?Colors.white:Colors.primary}]}>{props.status==0?"Pending":props.status==-1?"Rejected":props.status==1?"Accepted":"Completed"}</Text>
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