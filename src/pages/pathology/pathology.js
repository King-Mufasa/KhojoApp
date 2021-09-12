import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, SectionList, View } from 'react-native'
import BundleItem from '../../components/items/bundleitem'
import TestItem from '../../components/items/testitem'
import APIkit from '../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import ModalContent from '../../components/modalcontent'
import StandardStyles from '../../styles/standardstyles';
import VendorDetails from '../../components/vendordetail';
import Label from '../../components/label';
import SearchComponent from '../../components/search';
import CartView from '../../components/cartview'
const PathologyDetail = (props) => {

    const [pathology, setPathology] = useState({})
    const [bundles, setBundles] = useState({});
    const [loading, setLoading] = useState(true)
    const [tests, setTests] = useState({})
    const [vendorid, setVendorid] = useState(props.navigation.state.params.vendor_id)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalMessage] = useState('')
    const [filter, setFilter] = useState('')
    const [cart, addCart] = useState([])
    const getDetails = () => {
        const payload = { type: 'pathology', id: vendorid, filter: filter };
        const onSuccess = (data) => {
            setLoading(false)
            setBundles(data.data.bundles)
            setPathology(data.data.vendor[0])
            setTests(data.data.tests)
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
    const getTest = () => {
        getDetails()
    }
    const changeFilter = filter => {
        setFilter(filter)
    }
    const renderHeader = () => {
        return (
            <View>
                <CartView cart={pathology} />
                <Label name="Available Bundles" />
                <SectionList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'Bundles', data: bundles
                        },
                    ]}
                    renderItem={({ item }) => <BundleItem info={item} />}
                    keyExtractor={(item, index) => index}
                />
                <Label name="Test List" />
            </View>
        )
    }
    
    useEffect(() => {
        getDetails()
    }, [])
    return (
        <View style={StandardStyles.container}>
            <SearchComponent textend={getTest} textchange={changeFilter} placeholder="Search Test with name and type" />

            <Spinner visible={loading} />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <ModalContent onPress={() => { setModalShow(false) }} message={modalmessage} button={"Close"} />
            </Modal>

            <SectionList
                showsHorizontalScrollIndicator={false}
                renderSectionHeader={renderHeader}
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Tests', data: tests
                    },
                ]}
                renderItem={({ item }) => <TestItem info={item} />}
                keyExtractor={(item, index) => index}
            />
            {/* <VendorInfoView  data = {pathology}/>
            <BundleItem /> */}

        </View>
    )
}

const styles = StyleSheet.create({

})


export default PathologyDetail


