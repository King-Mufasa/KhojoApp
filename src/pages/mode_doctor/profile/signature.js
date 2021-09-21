import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import AwesomeLoading from 'react-native-awesome-loading';
import SignatureScreen from 'react-native-signature-canvas';
import APIkit from '../../../api/apikit';
import KButton from '../../../components/KButton';
import config from '../../../config';
import { screenHeight } from '../../../module/IntroSlider/src/themes';
import Colors from '../../../styles/color';
import Fontsize from '../../../styles/fontsize';
import Images from '../../../styles/images';
import { StandardStyles } from '../../../styles/standardstyles';
// import fetch_blob from 'react-native-fetch-blob';
// import RNFS from 'react-native-fs';


const SignatureCreator = ({ navigation }) => {
    const [sign, setSign] = useState(null)
    const [loading, setLoading] = useState(false)
    const [savedSign, setSavedSign] = useState(null)
    const ref = useRef()

    const handleOK = (signature) => {
        setSign(signature)
        // console.log(signature);
        // onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        ref.current.clearSignature();
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
    };

    const handleConfirm = (data) => {
        ref.current.readSignature();
        // const fs = fetch_blob.fs
        // const dirs = fetch_blob.fs.dirs
        // const file_path = dirs.CacheDir + "temp.png"
        // var image_data = sign.split('data:image/png;base64,');
        // image_data = image_data[1];
        // RNFS.writeFile(file_path, image_data, 'base64')
        //     .then((success) => {
        //         console.log(file_path)
        //         uploadSign()
        //     })
        //     .catch((error) => {
        //         alert(JSON.stringify(error));
        //     });
        uploadSign()
    }

    const uploadSign = () => {
        const payload = {
            sign: sign
        }
        const onSuccess = (response) => {
            console.log(response.data)
            if (response.data.status == 'success')
                setSavedSign(response.data.signature)
            setLoading(false)

        }
        const onFailed = (response) => {
            console.log(response)
            setLoading(false)
        }
        setLoading(true)
        APIkit.post("doctor.profile.sign.upload", payload).then(onSuccess).catch(onFailed)
    }

    const getSignature = () => {
        const onSuccess = (response) => {
            console.log(response.data)
            if (response.data.status == 'success')
                setSavedSign(response.data.signature)
            setLoading(false)
        }
        const onFailed = (response) => {
            console.log(response)
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('doctor.profile.sign.get').then(onSuccess).catch(onFailed)
    }

    const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;


    useEffect(() => {
        getSignature()
    }, [])
    return (
        <View style={StandardStyles.container} >
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="loading" />
            <View style={{ padding: 10, height: "100%", justifyContent: 'flex-end' }}>
                <Text style={[Fontsize.medium, { color: Colors.other_3 }]}>Saved Signature</Text>
                <View style={styles.preview}>
                    {savedSign ? (
                        <Image
                            source={{ uri: savedSign ? config.baseurl + savedSign : Images.default_symbol }}
                            resizeMode={"contain"}
                            style={styles.signview}
                        />
                    ) : <Text>No Signature saved yet</Text>}
                </View>
                <SignatureScreen
                    ref={ref}
                    onEnd={handleEnd}
                    onOK={handleOK}
                    autoClear={false}
                    webStyle={style}
                    descriptionText={"Sign for prescription"}
                />
                <View style={styles.row}>
                    <KButton name='Clear' click={handleClear} type="danger" style={{ width: "30%" }} />
                    <KButton name="Confirm" click={handleConfirm} type="success" style={{ width: "30%" }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        padding: 10,
    },
    preview: {
        width: "100%",
        height: 100,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        padding: 10
    },
    signview: {
        width: '100%',
        height: '100%'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
})


export default SignatureCreator