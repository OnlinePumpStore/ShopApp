import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from './ItemRatingModal.Styles';
import { AirbnbRating } from 'react-native-ratings';
import Button from '../Button/Button.component'
import { height, width } from 'react-native-dimension';
import firestore from '@react-native-firebase/firestore';
/**
 * @file Item Rating Component
 * @author Krutik Parikh
 */
/**
 * Item Component Module
 * @module ComponentItemRating
 */
/**
 * Item
 * @typedef {Object} Item
 * @property {number} id - Item ID
 * @property {String} title - Item Name
 * @property {string} image - Item Image URL
 * @property {string} price - Item Price
 * @property {string} inStock - Item InStock
 * @property {string} category - Item Category
 */
/**
 * Item Rating component when the order is filled and completed user can click the image and this component will popup
 * @param {boolean} isVisible - Visibility passed as props 
 * @param {string} onRequestClose - Function that close the modal on click
 * @param {Item} Item - Item Object gets from firebase
 * @returns {JSX.Element}
 * @function
 */

export default function WrapperComponent({ isVisible, onRequestClose, item }) {
    const [rating, setRating] = useState(3)
    const rateProduct = async () => {
        await firestore().collection("Orders")
            .doc(item.orderId).get()
            .then(async order => {
                var order = { ...order.data() }
                var itemIndex = order.items.findIndex(data => data.id == item.id)
                order.items[itemIndex] = { ...order.items[itemIndex], rated: true }
                await firestore().collection("Orders")
                    .doc(item.orderId).update(order).catch(err => {
                        console.log(err)
                    });
            }).catch(err => {
                console.log(err)
            })
        await firestore().collection("Products")
            .doc(item.id).get()
            .then(async product => {
                var newProduct = { ...product.data() }
                var productPreviousRating = newProduct.rating ? newProduct.rating : 0;
                var productPreviousCount = newProduct.ratingCount ? newProduct.ratingCount : 0;
                newProduct.rating = ((productPreviousRating * productPreviousCount) + rating) / (productPreviousCount + 1)
                newProduct.ratingCount = productPreviousCount + 1;
                await firestore().collection("Products")
                    .doc(item.id).update(newProduct).catch(err => {
                        console.log(err)
                    });
            }).catch(err => {
                console.log(err)
            })
        onRequestClose()
    }
    return (<Modal isVisible={isVisible}
        onBackButtonPress={onRequestClose}
        onBackdropPress={onRequestClose}>
        <View style={styles.container}>
            <Image
                source={{ uri: item?.image }}
                style={styles.image}
            />
            <Text style={styles.head}>{item?.title}</Text>
            <Text style={styles.dataHead}>Rate your experience</Text>
            <AirbnbRating
                count={5}
                reviews={["Very Bad", "Bad", "Average", "Good", "Amazing"]}
                defaultRating={3}
                size={width(8)}
                onFinishRating={(rating) => { setRating(rating) }}
            />
            <Button title={"Send Feedback"}
                containerStyle={{ marginTop: height(3) }}
                onPress={rateProduct} />
        </View>
    </Modal >
    )
}