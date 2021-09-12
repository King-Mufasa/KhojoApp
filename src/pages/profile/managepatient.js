import React, { useState } from 'react'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View, SectionList, TouchableHighlight } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import KButton from '../../components/KButton'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from '../../components/bottomsheet'
import SelectDropdown from 'react-native-select-dropdown'
import Modal from "react-native-modal";
import Patient from '../../components/modalcontent/patient'
import APIkit from '../../api/apikit'
import AwesomeLoading from 'react-native-awesome-loading'
import { useEffect } from 'react'
import Snackbar from 'react-native-snackbar'
const addresstype = ["Me", "Family", "Friend"]

class EditView extends React.Component {
    render() {
        return (
            <SafeAreaView style={this.props.style}>
                <Text style={[Fontsize.small, { marginTop: 20 }]}>{this.props.label}</Text>
                <TextInput
                    style={[styles.input, Fontsize.small]}
                    keyboardType={this.props.type}
                    maxLength={20}
                    value={this.props.value}
                />
            </SafeAreaView>
        )
    }
}


const ManagePatient = (props) => {
    const [modalshow, setModalShow] = useState(false)
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState('male')
    const [type, setType] = useState(1)
    const [loading, setLoading] = useState()
    const [addresslist, setAddressList] = useState([])

    const addPatient = (gender) => {
        if(phone.length!=10){
            Snackbar.show({
                text: 'Invalid Phone!',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        if(age>149||age<1){
            Snackbar.show({
                text: 'No one can live so long!',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        setGender(gender)
        setModalShow(false)
        const payload = {
            "name": name,
            'address': address,
            'age':age,
            'gender':gender,
            'phone':phone,
            'type': type
        }
        const onSuccess = (response) => {
            console.log(response)
            setLoading(false)
            getAddress()
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        console.log(payload)
        setLoading(true)
        APIkit.post('customer.patient.create', payload).then(onSuccess).catch(onFailed);
    }

    const getAddress = () => {
        const onSuccess = (response) => {
            console.log(response.data)
            setAddressList(response.data)
            console.log(addresslist)
            setLoading(false)
        }
        const onFailed = (response) => {
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.patient.get').then(onSuccess).catch(onFailed)
    }
    const removeAddress = (id) => {
        const onSuccess = (response) => {
            getAddress()
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post('customer.patient.delete', { id, id }).then(onSuccess).catch(onFailed)
    }
    useEffect(() => {
        getAddress()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <AwesomeLoading indicatorId={10} size={100} isActive={loading} text="loading" />
            <View style={{ padding: 20 }}>
                <Modal
                    testID={'modal'}
                    isVisible={modalshow}
                    onSwipeComplete={() => setModalShow(false)}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.modal}>
                    <Patient name={setName} type={setType} address={setAddress} age={setAge} phone={setPhone} gender={setGender} action={addPatient} />
                </Modal>
                <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: '', data: addresslist
                        },
                    ]}
                    renderItem={({ item }) =>
                        <TouchableHighlight style={styles.listbutton} activeOpacity={0.6} underlayColor="#DDDDDD" >
                            <SafeAreaView style={styles.listitem}>
                                <View style={{flexDirection:"row",alignItems:'center'}}>
                                    <Icon name={item.type == 1 ? 'home' : item.type == 2 ? 'handshake-o' : 'user'} size={25} style={styles.icon} />
                                    <View>
                                        <Text style={styles.item}>{item.name}</Text>
                                        <Text style={Fontsize.mini}>{item.address}</Text>
                                    </View>
                                </View>
                                <Icon name="trash-o" size={20} color={Colors.danger} onPress={() => {removeAddress(item.id) }} />
                            </SafeAreaView>
                        </TouchableHighlight>}
                    renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <KButton name="Add New Patient" click={() => { setModalShow(true) }} />
            </View>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
    },
    input: {
        width: "100%",
        marginTop: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.lightdark,
        paddingHorizontal: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    listitem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal:10
    },
    listbutton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        borderColor: Colors.lightblue,
        borderWidth: 1,
        marginTop: 10,
    },
    scrollView: {
        marginBottom: 20
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

})

export default ManagePatient