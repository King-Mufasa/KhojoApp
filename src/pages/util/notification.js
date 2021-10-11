import React,{useState,useEffect} from 'react'
import { StyleSheet, View, SectionList, SafeAreaView } from 'react-native'
import APIkit from '../../api/apikit'
import NotificationItem from '../../components/items/notificationitem'
import AwesomeLoading from 'react-native-awesome-loading';
import Colors from '../../styles/color';
import Modal from "react-native-modal";
import ModalContent from '../../components/modalcontent'
import Spinner from 'react-native-loading-spinner-overlay';

const Notification = () =>{
    const[notifications, setNotifications] = useState({})
    const[modalmessage, setModalMessage] = useState()
    const[modalshow, setModalShow] = useState()
    const[loading, setLoading] = useState()
    const getNotification = () =>{
        const onSuccess = (data) =>{
            console.log(data.data)
            setNotifications(data.data)
        }
        const onFailed = (data) =>{
            console.log(data.data)
        }

        APIkit.post("getNotification").then(onSuccess).catch(onFailed)
    }
    const remove = (id) =>{
        const payload = {id}
        setLoading(true)
        const onSuccess = (data) =>{
            setLoading(false)
            console.log(data)
            setNotifications(data.data)
        }
        const onFailed = (data)=>{
            setLoading(false)
            console.log(data)
        }
        APIkit.post('removeNotif',payload).then(onSuccess).catch(onFailed)
    }
    useEffect(()=>{
        getNotification()
    },[])
    return(
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
            <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Pathologys', data: notifications
                    },
                ]}
                renderItem={({ item }) => <NotificationItem info={item} click={()=>{viewDetail(item.id)}} remove={remove}/>}
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


export default Notification