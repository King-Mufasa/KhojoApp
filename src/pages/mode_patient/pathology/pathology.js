import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, SectionList, View } from 'react-native'
import BundleItem from '../../../components/items/bundleitem'
import TestItem from '../../../components/items/testitem'
import APIkit from '../../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import ModalContent from '../../../components/modalcontent'
import StandardStyles from '../../../styles/standardstyles';
import VendorDetails from '../../../components/vendordetail';
import Label from '../../../components/label';
import SearchComponent from '../../../components/search';
import CartView from '../../../components/cartview'
import UploadPrescripion from '../../../components/uploadprescription'
import Appointment from '../../../components/modalcontent/appointment'
import BookTest from '../../../components/modalcontent/booktest'
import makePayment from '../../../module/payment'
import { useGlobalState } from '../../../store/state'
import AwesomeLoading from 'react-native-awesome-loading'
import Colors from '../../../styles/color'
import { Snackbar } from 'react-native-paper'
const PathologyDetail = (props) => {

    const [pathology, setPathology] = useState({})
    const [bundles, setBundles] = useState({});
    const [loading, setLoading] = useState(true)
    const [tests, setTests] = useState({})
    const [vendorid, setVendorid] = useState(props.navigation.state.params.vendor_id)
    const [modalshow, setModalShow] = useState(false)
    const [ordermodalshow, setOrderModalShow] = useState(false)
    const [modalmessage, setModalMessage] = useState('')
    const [filter, setFilter] = useState('')
    const [cart, addCart] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedBundle, setSelectedBundle] = useState([])
    const [price, setPrice] = useState(0)
    const [testprice, setTestPrice] = useState(0)
    const [bundleprice, setBundlePrice] = useState(0)
    const [patient, setPatient] = useState()
    const [selectedpatient, selectPatient] = useState()
    const [user] = useGlobalState("user")
    
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
    const getAddress = () => {
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
    const getTest = () => {
        getDetails()
    }
    const changeFilter = filter => {
        setFilter(filter)
    }
    const onChangeSelect = (type, id) => {
        console.log(selectedItems+":" +id)
        if (type == "test") {
            let buffer = selectedItems
            if (selectedItems.includes(id))
                buffer.pop(id)
            else
                buffer.push(id)
            setSelectedItems(buffer)    
            let total = 0
            tests.forEach(test => {
                console.log(test.id)
                if (selectedItems.includes(test.id))
                    total += test.rate
            });
            setTestPrice(total)
            console.log(price)
        }
        else {
            let buffer = selectedBundle
            if (selectedBundle.includes(id))
            buffer.pop(id)
            else
            buffer.push(id)
            setSelectedBundle(buffer)
            console.log(bundleprice)
            let total = 0
            bundles.forEach(bundle => {
                console.log(bundle.id)
                if (selectedBundle.includes(bundle.id))
                    total += bundle.rate
            });
            setBundlePrice(total)
        }

    }
    const createOrder = (price) =>{
        const payload = {
            'total_price':price,
            'pure_price':bundleprice+testprice,
            'bundle':selectedBundle,
            'tests':selectedItems,
            'patient':selectedpatient,
            'pathology':vendorid,
        }
        const onSuccess = (response) => {
            setLoading(false)
            console.log(response.data)
            const {navigate} = props.navigation
            navigate('OrderList')
        }
        const onFailed = (response) => {
            console.log(response)
            setLoading(false)
            Snackbar.show({
                text: response,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        APIkit.post('customer.generate.testorder',payload).then(onSuccess).catch(onFailed)
    }
    const MakePayment = (price) =>{
        console.log(price)
        if(patient.length==0){
            Snackbar.show({
                text: 'No patient data. create patient on your profile page.',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        setOrderModalShow(false)
        setLoading(true)
        const responseHandler = (result) => {
            
            const data = JSON.parse(result);
            console.log(data.txStatus);
            if(data.txStatus == "SUCCESS"){
                createOrder(price)
            }
            else{
                setLoading(false)
                Snackbar.show({
                    text: 'Something went wrong.',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
          };
        const note = "Book Lab Test"
        makePayment(price,note,user,responseHandler)
    }
    const renderHeader = () => {
        return (
            <View>
                <CartView cart={pathology} count={selectedItems.length + selectedBundle.length} price={bundleprice+testprice} click = {()=>{setOrderModalShow(true)}}/>
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
                    renderItem={({ item }) => <BundleItem info={item} change={onChangeSelect} selected={selectedBundle}/>}
                    keyExtractor={(item, index) => index}
                />
                <Label name="Test List" />
            </View>
        )
    }

    useEffect(() => {
        getAddress()
        getDetails()
    }, [])
    return (
        <View >
            <SearchComponent textend={getTest} textchange={changeFilter} placeholder="Search Test with name and type" />
            <AwesomeLoading indicatorId={17} size={80} isActive={loading} text="loading" />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <ModalContent onPress={() => { setModalShow(false) }} message={modalmessage} button={"Close"} />
            </Modal>
            <Modal
                testID={'ordermodal'}
                isVisible={ordermodalshow}
                onSwipeComplete={() => setOrderModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <BookTest action={MakePayment} type={selectPatient} patient={patient} price = {testprice + bundleprice}/>
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
                renderItem={({ item }) => <TestItem info={item} toggle={selectedItems.includes(item.id) ? true : false} selected={selectedItems} change={onChangeSelect} />}
                keyExtractor={(item, index) => index}
            />
            {/* <VendorInfoView  data = {pathology}/>
            <BundleItem /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollView:{
        paddingHorizontal:15,
        backgroundColor:Colors.primaryBack,
    }
})

export default PathologyDetail


