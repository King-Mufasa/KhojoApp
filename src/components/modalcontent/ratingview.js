import React, { useState } from 'react'
import { ColorPropType, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../../styles/color'
import { Rating, AirbnbRating } from 'react-native-ratings';
import KButton from '../KButton';

const RatingView = (props) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const ratingCompleted = (rating) => {
        console.log(rating)
    }

    const publishRating = () =>{
        
    }

    return (
        <View style={styles.container}>
            {/* <AirbnbRating /> */}

            {/* <AirbnbRating
                count={11}
                reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                defaultRating={11}
                size={20}
            /> */}
            <Rating
                type='heart'
                ratingCount={5.0}
                imageSize={50}
                startingValue={rating}
                showRating
                onFinishRating={setRating}
                
            />
            <TextInput value={review} onChangeText={setReview} style={styles.review} multiline={true} placeholder="Leave review about doctor."/>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <KButton name=' OK ' type='success' click={()=>{props.publish(rating, review)}}/>
                <KButton name='No-Review' click={()=>{props.publish(null,null)}}/>
                <KButton name='Cancel' type='danger' click={()=>{props.close(false)}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopStartRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.white,
        padding: 20
    },
    review:{
        borderRadius:10,
        borderColor:Colors.primary,
        borderWidth:1,
        paddingHorizontal:20,
        marginTop:20,
        marginBottom:10
    }
})


export default RatingView