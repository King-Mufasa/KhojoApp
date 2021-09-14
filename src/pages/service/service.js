import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, SectionList, TouchableHighlight } from 'react-native'
import Rating from '../../components/rating'
import KButton from '../../components/KButton'

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/color'
import SearchComponent from '../../components/search'
import Fontsize from '../../styles/fontsize'
import APIkit from '../../api/apikit'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import PathologyItem from '../../components/pathologyitem'
import Modal from "react-native-modal";
import ModalContent from '../../components/modalcontent'
import { RadioButton } from 'react-native-paper';
import ServiceItem from '../../components/items/serviceitem'
import Service from '../../components/modalcontent/Service'
import Snackbar from 'react-native-snackbar';

const ServiceGallery = ({ navigation }) => {

    const [filter, setFilter] = useState('')
    const [services, setPathology] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalMessage] = useState('')
    const [submodalshow, setSubmodalShow] = useState(false)
    const [service, selectService] = useState()
    const [description, setDescription] = useState('')

    const getService = () => {
        const onSuccess = ({ data }) => {
            setLoading(false)
            setPathology(data)
        }
        const onFailue = error => {
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.service.get').then(onSuccess).catch(onFailue)
    }

    const requestService = () => {
        const payload = { service_id: service.id,note:description };
        const onSuccess = (response) => {
            setLoading(false)
            console.log(response.data)
            Snackbar.show({
                text: 'OTP verified successfully',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        const onFailue = error => {
            setLoading(false)
            console.log(error)
        }
        setLoading(true)
        setModalShow(false)
        APIkit.post('customer.service.request', payload).then(onSuccess).catch(onFailue)
    }
    useEffect(() => {
        getService()
    }, [])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primaryBack, flex: 1 }}>
            <Spinner visible={loading} />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <Service action={requestService} service={service} desc={description} change={setDescription}/>
            </Modal>

            <Text style={[Fontsize.medium, { margin: 20 }]}>Select Service</Text>
            <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Services', data: services
                    },
                ]}
                renderItem={({ item }) => <ServiceItem service={item} click={() => { selectService(item), setModalShow(true)}}/>}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    selecttype: {
        backgroundColor: Colors.lightblue,
        margin: 10,
        borderRadius: 10,
        padding: 10
    },
    option: {
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 10,
    },
    label: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.primary
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})

export default ServiceGallery