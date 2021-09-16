import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, SectionList, View, Image, Text, TextInput } from 'react-native'
import BundleItem from '../../../components/items/bundleitem'
import TestItem from '../../../components/items/testitem'
import APIkit from '../../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import StandardStyles from '../../../styles/standardstyles';
import VendorDetails from '../../../components/vendordetail';
import Label from '../../../components/label';
import SearchComponent from '../../../components/search';
import SetPrescription from '../../../components/setprescription'
import SelectPrescription from '../../../components/modalcontent/select'
import ImagePicker from 'react-native-image-crop-picker';
import PatientDetail from '../../../components/patient/patientdetail'
import Snackbar from 'react-native-snackbar';
import FormData from 'form-data'
import { screenHeight, screenWidth } from '../../../module/IntroSlider/src/themes'
import Colors from '../../../styles/color'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeLoading from 'react-native-awesome-loading'

const PrescriptionRequest = (props) => {
    const [type, setType] = useState(props.navigation.state.params.type)
    const [vendor, setVendor] = useState({})
    const [loading, setLoading] = useState(true)
    const [vendorid, setVendorid] = useState(props.navigation.state.params.vendor_id)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalMessage] = useState('')
    const [prescription, setPrescription] = useState({})
    const [patient, setPatient] = useState([])
    const [selectedpatient, selectPatient] = useState(null)
    const [isready, setReady] = useState(false)
    const [description, setDescription] = useState()
    const getDetails = () => {

        const payload = { type: type, id: vendorid };

        const onSuccess = (data) => {
            setLoading(false)
            setVendor(data.data.vendor[0])
        }
        const onFailue = (data) => {
            setModalMessage(data.message)
            setModalShow(true)
            setLoading(false)
        }
        setModalShow(false)
        setLoading(true)
        APIkit.post('customer.getDetails/', payload).then(onSuccess).catch(onFailue)
    }
    const fromGallery = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 750,
            cropping: true
        }).then(image => {
            setModalShow(false)
            setPrescription({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
            }
            )
            setReady(true)
        });
    }
    const fromCamera = () => {
        ImagePicker.openCamera({
            width: 500,
            height: 750,
            cropping: true,
        }).then(image => {
            setModalShow(false)
            setPrescription({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
            }
            )
            setReady(true)
        });
    }
    const validate = () => {
        if (selectedpatient == null) {

            Snackbar.show({
                text: 'Please input Patient Information',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }

        setModalShow(true)

    }
    const request = () => {
        const onSuccess = ({ data }) => {
            console.log(data)
            setLoading(false)
        }
        const onFailue = data => {
            Snackbar.show({
                text: data.message,
                duration: Snackbar.LENGTH_SHORT,
            });
            console.log(data)
            setLoading(false)
        }
        var data = new FormData()
        if (type == "pharmacy") {
            data.append('type', 'product')
        }
        else {
            data.append('type', 'test')
        }
        data.append('vendor-id', vendorid)
        data.append('patient', selectedpatient)
        data.append('description',description)
        data.append("prescrition-file",
            {
                uri: prescription.uri,
                type: 'image/jpeg',
                name: 'prescription.jpeg'
            })
        setLoading(true)
        console.log(APIkit.defaults.headers)
        APIkit.post('customer.request.prescription.product', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(onSuccess).catch(onFailue)
    }
    const getPatients = () => {
        const onSuccess = (response) => {
            setPatient(response.data)
            setLoading(false)
            console.log(patient)
        }
        const onFailed = (response) => {
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.patient.get').then(onSuccess).catch(onFailed)
    }
    useEffect(() => {
        getDetails()
        getPatients()
    }, [])
    return (
        <ScrollView style={styles.container}>
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <SelectPrescription camera={() => { fromCamera() }} gallery={fromGallery} message={modalmessage} button={"Close"} />
            </Modal>
            <VendorDetails vendor={vendor} />
            <SelectDropdown
                defaultValueByIndex={0}
                buttonStyle={styles.typeselector}
                data={patient}
                onSelect={(selectedItem, index) => {
                    selectPatient(selectedItem.id);
                }}
                renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                        <View style={styles.addressselect}>
                            <View style={{ flexDirection: 'row' }}>
                                {selectedItem ? (
                                    <Icon
                                        name={selectedItem.type == 0 ? 'user' : selectedItem.type == 1 ? "home" : selectedItem.type == 2 ? "handshake-o" : "user"}
                                        size={25}
                                        style={styles.icon}
                                    />
                                ) : (
                                    <Icon name="user" color={Colors.primary} size={32} />
                                )}
                                <Text style={styles.dropdown3BtnTxt}>
                                    {selectedItem ? selectedItem.name : "Select Patient"}
                                </Text>
                            </View>

                            <Icon style={{ alignSelf: 'center' }} name="chevron-down" color={Colors.primary} size={18} />
                        </View>
                    )
                }}
                renderCustomizedRowChild={(item, index) => {
                    return (
                        <View style={styles.addresstype}>
                            <Icon name={item.type == 0 ? 'user' : item.type == 1 ? "home" : item.type == 2 ? "handshake-o" : "user"} size={25} style={styles.icon} />
                            <Text >{item.name}</Text>
                        </View>
                    )
                }}
            />
            <View style={[styles.selectedprescription, { display: prescription.uri ? "flex" : 'none' }]}>
                <Image source={{ uri: prescription.uri }} style={[styles.prescription]} />
                <TextInput
                    style={styles.description}
                    maxLength={220}
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                    numberOfLines={3} 
                    placeholder="Description"/>
            </View>
            <SetPrescription request={request} click={validate} isready={isready} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
        paddingHorizontal: 20,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    prescription: {
        width: 100,
        height: 120,
        alignSelf: 'center',
        borderRadius: 10
    },
    selectedprescription: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    typeselector: {
        width: '100%',
        borderRadius: 10,
        marginBottom: 20
    },
    addressselect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },
    addresstype: {
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    dropdown3BtnTxt: {
        alignSelf: 'center',
        marginStart: 10
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
    },
    description: {
        backgroundColor: Colors.lightblue,
        width: "60%",
        textAlignVertical: 'top', 
    }
})


export default PrescriptionRequest


