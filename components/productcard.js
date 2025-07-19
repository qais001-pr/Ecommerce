
/* eslint-disable curly */


/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Animated, Pressable, Modal } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faStar as startsIcons } from '@fortawesome/free-regular-svg-icons'
import { styles } from '../styles/components/productcard'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { ip } from '../config'
import Loader from './loader'
import Error from './error'
import { useAuth } from '../context/authcontext'

export default function ProductCard({ item }) {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [showerror, setshowerror] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const scaleAnim = useRef(new Animated.Value(1)).current

    const image = `data:${item.imageContentType};base64,${item.imageBytes}`

    useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1.2,
                friction: 2,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start()
    }, [isFavorite, scaleAnim])

    const toggleFavorite = () => {
        if (!user) {
            setshowerror(true);
            setTimeout(() => setshowerror(false), 2000);
            return;
        }
        setIsFavorite(!isFavorite);
    }

    const handleProductDetails = async (productid) => {

        try {
            setisLoading(true)

            const response = await axios.get(`${ip}/api/Product/getproductDetails/${productid}`)
            if (response.status === 200)
                navigation.navigate('productDetails', { product: response.data })
        } catch {
            setisLoading(false)
        }
        finally {
            setisLoading(false)
        }
    }
    return (
        <Pressable
            onPress={() => {
                handleProductDetails(item.id)
            }}>
            <View style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity
                        onPress={toggleFavorite}
                        style={styles.favoriteButton}
                        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        accessibilityRole="button"
                        activeOpacity={0.7}
                    >
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <FontAwesomeIcon
                                icon={isFavorite ? solidHeart : regularHeart}
                                size={22}
                                color={isFavorite ? 'red' : '#888'}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ color: 'black', fontSize: 12 }}>
                                Availability: {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'black', marginRight: 5 }}>{item.rating}</Text>
                            <FontAwesomeIcon icon={startsIcons} style={{ color: '#cccc10ff' }} />
                        </View>
                    </View>

                </View>
            </View>
            <Modal transparent={true} visible={isLoading} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '50%', height: '50%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View>
                </View>
            </Modal>
            <Modal visible={showerror} transparent={true}>
                <Error message="Please Login or SignUp" />
            </Modal>
        </Pressable>
    )
}
