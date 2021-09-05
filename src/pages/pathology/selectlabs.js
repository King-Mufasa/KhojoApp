import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, SectionList } from 'react-native'
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
const initialState = {
    search_filter: '',
    errors: {},
    Pathologys: {},
    isLoading: false,
}

const PathologyGallery = (props) => {

    const [filter, setFilter] = useState('')
    const [pathology, setPathology] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalMessage] = useState('')
    const changeSearchFilter = search_filter => {
        setFilter(search_filter)
        getPathology()
    }

    const getPathology = () => {
        const keyword = { filter_name: filter,vendor:'pathology' };
        const onSuccess = ({ data }) => {
            console.log(data)
            setLoading(false)
            setPathology(data)
        }
        const onFailue = error => {
            console.log(error.response.data)
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.getVendor/', keyword).then(onSuccess).catch(onFailue)
    }

    const viewDetail = id =>{
        console.log(id)
        const {navigate} = props.navigation
        navigate('PathologyDetail',{vendor_id:id})
    }


    useEffect(()=>{
        getPathology()
    },[])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primaryBack, flex: 1 }}>
            <Spinner visible={loading} />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <ModalContent onPress={() => setModalShow(false)} message={modalmessage}/>
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
                renderItem={({ item }) => <PathologyItem info={item} click={()=>{viewDetail(item.id)}}/>}
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
})

export default PathologyGallery