import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text,ScrollView } from 'react-native'
import Collapsible from 'react-native-collapsible';
import APIkit from '../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import {StandardStyles} from '../../styles/standardstyles';
import Accordion from 'react-native-collapsible/Accordion';
import Commonstyle from '../../styles/comonview';
import Colors from '../../styles/color';
import BadgeButton from '../../components/badgebtn';
import Badge from '../../components/util/badge'
import Label from '../../components/label';
import config from '../../config';
import Avatar from '../../components/avatar';
import Moment from 'moment';
import SearchComponent from '../../components/search';
import Icon from 'react-native-vector-icons/FontAwesome'
import Fontsize from '../../styles/fontsize';
const SECTIONS = [
    {
        name: 'Loading',
        content: 'loading data...',
    },
];
const TransactionList = (props) => {
    const [transactions, setTransactions] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const navigate = (id) =>{
        const {navigate} = props.navigation
        navigate("OrderDetail",{id:id})
    }
    const getMyRequest = () => {
        const onSuccess = (data) => {
            console.log(data.data)
            setLoading(false)
            setTransactions(data.data)
            console.log(transactions)
        }
        const onFailue = (data) => {
            setLoading(false)
            console.log(data.data)
        }
        setLoading(true)
        APIkit.post('user.transactions.get/').then(onSuccess).catch(onFailue)
    }
    const _renderSectionTitle = (section) => {
        return (
            <View>

            </View>
        );
    };
    const _renderContent = (section) => {
        return (
            <View style={[StandardStyles.commonlightview, { flexDirection: 'column' }]}>
                {/* <View>
                    <Text style={styles.label}>Code</Text>
                    <Text style={styles.info}>{section.code}</Text>
                </View> */}
                <View>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.info}>{section.description}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Price</Text>
                    <Text style={[{color:Colors.success, }, Fontsize.medium,styles.info]}><Icon name="inr" size={20} color={Colors.success}/>{section.price}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Transaction Created on</Text>
                    <Text style={styles.info}>{Moment(section.created_at).format('LL')}</Text>
                </View>
            </View>
        );
    };
    const _renderHeader = (section) => {
        console.log(section.order_code)
        return (
            <View style={[styles.header,{display:section.code?"flex":"none"}]} >
                <View>
                    <Text style={{ color: Colors.lightdark }}>Name of Transaction</Text>
                    <Text>{section.name}</Text>
                </View>
                {/* <Badge status={section.status===undefined?0:section.status} /> */}
            </View>
        );
    };
    useEffect(() => {
        getMyRequest()
    }, [])
    return (
        <View style={[StandardStyles.container]}>
            <Spinner visible={loading} />
            {/* <SearchComponent placeholder="Search with Order Code"/> */}
            <Label name="My transactions" />
            <ScrollView showsVerticalScrollIndicator={false}>
            {(transactions!==undefined&&transactions!==null&&transactions.length>0)&&<Accordion
                sections={transactions}
                activeSections={activeSections}
                renderSectionTitle={_renderSectionTitle}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={setActiveSections}
                underlayColor={Colors.primaryBack}
            />}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10,
    },
    receiver: {
        flexDirection: 'row'
    },
    label:{
        color:Colors.lightdark,
        marginTop:5
    },
    info:{
        paddingHorizontal:10
    }
})

export default TransactionList
