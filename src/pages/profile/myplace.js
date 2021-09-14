import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker } from "react-native-maps";
import { View, StyleSheet, Image } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import Images from '../../styles/images'
const MyPlace = (props) => {
    const [location, setLocation] = useState({
        latitude: 52.882004,
        longitude: 64.582748,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const [address, setAddress] = useState({
        latitude: 21.47625652,
        longitude: 80.88750189,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    function getCurrentLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(
                    // getRegionForCoordinates({
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }
                    // })
                )
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    function getRegionForCoordinates(points) {
        // points should be an array of { latitude: X, longitude: Y }
        console.log(points)
        let minX, maxX, minY, maxY;

        // init first point
        ((point) => {
            minX = point.latitude;
            maxX = point.latitude;
            minY = point.longitude;
            maxY = point.longitude;
        })(points[0]);

        // calculate rect
        points.map((point) => {
            minX = Math.min(minX, point.latitude);
            maxX = Math.max(maxX, point.latitude);
            minY = Math.min(minY, point.longitude);
            maxY = Math.max(maxY, point.longitude);
        });

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX);
        const deltaY = (maxY - minY);

        return {
            latitude: midX,
            longitude: midY,
            latitudeDelta: deltaX,
            longitudeDelta: deltaY
        };
    }

    const newAddress = (region) => {
        console.log(region)
    }
    useEffect(() => {
        getCurrentLocation()
        if(props.navigation.getParam('mode'))
            console.log("KILL")
    }, [])
    return (
        <View style={styles.container}>
            <MapView style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={
                    location
                } showsUserLocation={true}
                onPress={newAddress}>
                <Marker
                    coordinate={address}
                    title="Home"
                    description="my home">
                    <Image source={Images.mark_home} style={{ width: 30, height: 30 }}
                        resizeMode="contain" />
                </Marker>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MyPlace