import React, { useState } from 'react'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View, SectionList, TouchableHighlight, _Image } from 'react-native'
import Colors from '../../../styles/color'
import Fontsize from '../../../styles/fontsize'
import BadgeButton from '../../../components/badgebtn'
import { screenWidth } from '../../../module/IntroSlider/src/themes'
import KButton from '../../../components/KButton'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from '../../../components/bottomsheet'
import SelectDropdown from 'react-native-select-dropdown'
import Modal from "react-native-modal";
import Patient from '../../../components/modalcontent/patient'
import APIkit from '../../../api/apikit'
import AwesomeLoading from 'react-native-awesome-loading'
import { useEffect } from 'react'
import Snackbar from 'react-native-snackbar'
import Avatar from '../../../components/avatar'
import SearchComponent from '../../../components/search'
const addresstype = ["Me", "Family", "Friend"]


const MyPatients = (props) => {
    const [modalshow, setModalShow] = useState(false)
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState('male')
    const [type, setType] = useState(1)
    const [loading, setLoading] = useState()
    const [patients, setPatients] = useState([])
    const [filter, setFilter] = useState("")

    const getPatients = () => {
        const payload={filter:filter}
        const onSuccess = (response) => {
            setLoading(false)
            console.log(response.data)
            setPatients(response.data)
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post('doctor.patients.get', payload).then(onSuccess).catch(onFailed)
    }

    useEffect(() => {
        getPatients()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <AwesomeLoading indicatorId={10} size={100} isActive={loading} text="loading" />
            <SearchComponent placeholder="Patient name" textchange={setFilter} callback={getPatients}/>
            <View style={{ paddingHorizontal: 20, }}>
                <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: '', data: patients
                        },
                    ]}
                    renderItem={({ item }) =>
                        <View style={styles.listbutton}>
                            <SafeAreaView style={styles.listitem}>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <View style={styles.avatar}>

                                        <Avatar image={item.image} />
                                        <Text style={[styles.itemname, Fontsize.medium]}>{item.name}</Text>
                                    </View>
                                    <View style={styles.infos}>
                                        <View style={styles.infoLayout}>
                                            <Icon style={styles.icon} name="phone-square" size={22} />
                                            <Text style={[Fontsize.mini, styles.infoItem]}>{item.phone}</Text>
                                        </View>
                                        <View style={styles.infoLayout}>
                                            <Icon style={styles.icon} name="envelope" size={20} />
                                            <Text style={[Fontsize.mini, styles.infoItem]}>{item.email}</Text>
                                        </View>
                                        <View style={styles.infoLayout}>
                                            <Icon style={styles.icon} name="address-card-o" size={18} />
                                            <Text style={[Fontsize.mini, styles.infoItem]}>{item.address}</Text>
                                        </View>
                                        <View style={styles.infoLayout}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:'100%'}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <Icon style={styles.icon} name="birthday-cake" size={20} />
                                                    <Text style={[Fontsize.mini, styles.infoItem]}>{item.age}</Text>
                                                </View>
                                                <View style={{flexDirection:'row'}}>
                                                <Icon style={styles.icon} name={item.email==1?'male':'female'} size={20}/>
                                                    <Text style={[Fontsize.mini, styles.infoItem]}>{item.email==1?'Male':'Female'}</Text>
                                                </View>
                                                
                                                <View></View>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>}
                    renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
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
    avatar: {
        width: "30%"
    },
    infos: {
        width: '65%',
        marginStart: 10
    },
    itemname: {
        color: Colors.lightblue,
        fontWeight: "bold",
        width: '100%',
        textAlign: 'center'
    },
    infoItem: {
        color: Colors.white,
        alignSelf: 'center'
    },
    listitem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    infoLayout: {
        flexDirection: 'row',
        padding: 5
    },
    listbutton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.other_2,
        borderColor: Colors.lightblue,
        borderWidth: 1,
        marginBottom: 10,
        shadowColor: Colors.other_3,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 10,
        margin: 10
    },
    scrollView: {
        marginBottom: 20
    },
    icon: {
        color: Colors.white,
        marginEnd: 10
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

})

export default MyPatients