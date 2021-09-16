import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, SectionList, TouchableHighlight } from 'react-native'
import Rating from '../../../components/rating'
import KButton from '../../../components/KButton'

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../styles/color'
import SearchComponent from '../../../components/search'
import Fontsize from '../../../styles/fontsize'
import APIkit from '../../../api/apikit'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import PathologyItem from '../../../components/pathologyitem'
import Modal from "react-native-modal";
import ModalContent from '../../../components/modalcontent'
import { RadioButton } from 'react-native-paper';

const PathologyGallery = (props) => {

    const [filter, setFilter] = useState('')
    const [pathology, setPathology] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalMessage] = useState('')
    const [submodalshow, setSubmodalShow] = useState(false)
    const [selectedid, selectLab] = useState()
    const changeSearchFilter = search_filter => {
        setFilter(search_filter)
        getPathology()
    }

    const getPathology = () => {
        const keyword = { filter_name: filter, vendor: 'pathology' };
        const onSuccess = ({ data }) => {
            setLoading(false)
            setPathology(data)
        }
        const onFailue = error => {
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.getVendor/', keyword).then(onSuccess).catch(onFailue)
    }


    const viewDetail = () => {
        setSubmodalShow(false)
        const { navigate } = props.navigation
        navigate('PathologyDetail', { vendor_id: selectedid })
    }
    const request = () =>{
        setSubmodalShow(false)
        const { navigate } = props.navigation
        navigate('RequestOrder', { type: 'pathology',vendor_id: selectedid })
    }

    useEffect(() => {
        getPathology()
    }, [])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primaryBack, flex: 1 }}>
            <Spinner visible={loading} />
            <Modal
                testID={'resultmodal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <ModalContent onPress={() => setModalShow(false)} message={modalmessage} />
            </Modal>
            <Modal
                testID={'labselectmodal'}
                isVisible={submodalshow}
                onSwipeComplete={() => setSubmodalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <View>
                    <View style={styles.selecttype}>
                        <TouchableHighlight  onPress={() => request()} underlayColor={Colors.lightblue}>
                            <View style={styles.option}>
                                <RadioButton
                                    style={styles.label}
                                    status={'unchecked'}
                                />
                                <Text style={styles.label}>Request with Prescription</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={() => viewDetail()} underlayColor={Colors.lightblue}>
                            <View style={styles.option}>
                                <RadioButton
                                    style={styles.label}
                                    status={'unchecked'}
                                    color={Colors.danger}
                                />
                                <Text style={styles.label}>Book test directly</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <SearchComponent callback={changeSearchFilter} />
            <Text style={[Fontsize.medium, { margin: 20 }]}>Select Pathology</Text>
            <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Pathologys', data: pathology
                    },
                ]}
                renderItem={({ item }) => <PathologyItem info={item} click={() => { selectLab(item.id), setSubmodalShow(true) }} />}
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
    }
})

export default PathologyGallery