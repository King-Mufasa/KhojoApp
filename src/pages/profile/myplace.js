import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from "react-native-maps";
import { View, StyleSheet } from 'react-native'
navigator.geolocation = require('@react-native-community/geolocation');
const MyPlace = (props) => {
    const [location, setLocation] = useState({
        latitude: 52.882004,
        longitude: 64.582748,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    async function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
            let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 5,
                    longitudeDelta: 5
                };
                setLocation(region)
                console.log(region)
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])
    return (
        <View style={styles.container}>
            <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE}
                region={
                    location
                } showsUserLocation={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MyPlace