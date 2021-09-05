import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, SectionList, View, Image } from 'react-native'
import BundleItem from '../../components/items/bundleitem'
import TestItem from '../../components/items/testitem'
import APIkit from '../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import StandardStyles from '../../styles/standardstyles';
import VendorDetails from '../../components/vendordetail';
import Label from '../../components/label';
import SearchComponent from '../../components/search';
import SetPrescription from '../../components/setprescription'
import SelectPrescription from '../../components/prescription/select'
import ImagePicker from 'react-native-image-crop-picker';
import PatientDetail from '../../components/patient/patientdetail'
import Snackbar from 'react-native-snackbar';
import FormData from 'form-data'
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes'
const PharmacyDetail = (props) => {

    const [pharmacy, setPharmacy] = useState({})
    const [loading, setLoading] = useState(true)
    const [vendorid, setVendorid] = useState(props.navigation.state.params.vendor_id)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalMessage] = useState('')
    const [prescription, setPrescription] = useState({})
    const [patient_gender, setGender] = useState('male')
    const [patient_name, setName] = useState('')
    const [patient_address, setAddress] = useState('')
    const [patient_age, setAge] = useState()
    const [patient_number, setNumber] = useState('')
    const [isready, setReady] = useState(false)
    const getDetails = () => {
        const payload = { type: 'pharmacy', id: vendorid };
        const onSuccess = (data) => {
            setLoading(false)
            setPharmacy(data.data.vendor[0])
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
        if (patient_name === "" || patient_address === "" || patient_age === "" || patient_number === '') {
            Snackbar.show({
                text: 'Please input Patient Information',
                duration: Snackbar.LENGTH_SHORT,
            });
        }

        setModalShow(patient_number !== "" && patient_name !== "" && patient_address !== "" && patient_age !== "")

    }
    const request = () => {
        console.log("Yahoo!")
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
        data.append('type', 'product')
        data.append('pharmacy-id', vendorid)
        data.append('name', patient_name)
        data.append('gender', patient_gender)
        data.append('address', patient_address)
        data.append('phone', patient_number)
        data.append('age', patient_age)
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

    useEffect(() => {
        getDetails()
    }, [])
    return (
        <ScrollView style={StandardStyles.container}>
            <Spinner visible={loading} />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <SelectPrescription camera={() => { fromCamera() }} gallery={fromGallery} message={modalmessage} button={"Close"} />
            </Modal>
            <VendorDetails vendor={pharmacy} />
            <PatientDetail number={setNumber} name={setName} address={setAddress} age={setAge} gender={patient_gender} setgender={setGender} />
            <Image source={{uri:prescription.uri}} style={[{display:prescription.uri?"flex":'none'},styles.prescription]}/>
            <SetPrescription request={request} click={validate} isready={isready} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    prescription:{
        width:screenWidth*0.8,
        height:screenHeight*0.8,
        alignSelf:'center',
        borderRadius:10
    }
})


export default PharmacyDetail


