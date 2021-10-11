import React,{useState} from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import KButton from '../KButton'
import Fontsize from '../../styles/fontsize'
import EditView from '../util/editview'
import SelectDropdown from 'react-native-select-dropdown'
import Colors from '../../styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../module/IntroSlider/src/themes'
import { RadioButton } from 'react-native-paper';
import { InputPhone } from '../phoneinput'
import Snackbar from 'react-native-snackbar'
const AddTest = (props) => {
    const [name, setName] = useState('')
    const [remarks, setRemarks] = useState('')
    const addTest = () =>{
        if(name.length!==0 && remarks.length!==0){
            let buffer = props.medicine
            buffer.push({name:name,remarks:remarks})
            props.settest(buffer)
            props.close()
        }
        else{
            Snackbar.show({
                text: 'Please input all detail information',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }
    return (
        <View>
            <View style={styles.modal}>
                <EditView label="Test Name" onChangeText={setName} />
                <EditView label="Remarks" onChangeText={setRemarks} />
                <KButton name="Add Test" click={()=>{addTest()}} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    modal: {
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.primaryBack
    },
    address: {
        flexDirection: "row",
        alignItems: "center"
    },
    typeselector: {
        width: '100%',
        borderRadius: 10
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
    },
    addressselect:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignContent:'center'
    },
    addresstype:{
        flexDirection:'row',
        paddingHorizontal:20
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
}
)


export default AddTest