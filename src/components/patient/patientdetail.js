import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {InputPhone} from '../phoneinput'
import EditView from '../util/editview'
import Colors from '../../styles/color'
import { RadioButton } from 'react-native-paper';

const PatientDetail = (props) => {
    return (
        <View style = {styles.container}>
            <EditView label="Patient's Full Name" placeholder="Abudul Alaff" onChangeText={props.name}/>
            <EditView label="Patient's Address" placeholder="" keyboardType = "numeric" onChangeText={props.address}/>
            <EditView label="Patient's Age" placeholder="" keyboardType = "numeric" onChangeText={props.age}/>
            <InputPhone placeholder="Patient's Phone" style={{marginTop:20}} onChangeText={props.number}/>
            <View style={styles.genderarea}>
                    <View style={styles.gender}>
                        <Text style={styles.label}>Male</Text>
                        <RadioButton
                            value="male"
                            status={props.gender === 'male' ? 'checked' : 'unchecked'}
                            onPress={() => props.setgender("male")}
                            style={
                                { width: 300 }
                            }
                        />
                    </View>
                    <View style={styles.gender}>
                        <Text style={styles.label}>Female</Text>
                        <RadioButton
                            value="female"
                            status={props.gender === 'female' ? 'checked' : 'unchecked'}
                            onPress={() => props.setgender("female")}
                            color={Colors.danger}
                        />
                    </View>
                </View>
        </View>
)
}




const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginBottom:20
    },
    genderarea: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        alignItems: 'flex-start',
        width: '45%',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20
    },
    gender: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    label: {
        alignSelf: 'center'
    },
})
export default PatientDetail