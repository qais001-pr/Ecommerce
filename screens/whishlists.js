/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable curly */
/* eslint-disable semi */
/* eslint-disable react/no-unstable-nested-components */
import { View, Text, Modal, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import { ip } from '../config';
import { useAuth } from '../context/authcontext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/loader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

export default function Wishlist() {
    const { user } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        if (!user?._id) return;
        try {
            setLoading(true);
            const response = await axios.get(`${ip}/api/Wishlists/GetAllProducts/${user._id}`);
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const removeFromWishlist = async (productId) => {
        try {
            setLoading(true);
            await axios.delete(`${ip}/api/Wishlists/Delete/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [fetchProducts])
    );

    const Product = ({ item }) => {
        const imageSrc = `data:${item.imageContent};base64,${item.imagebytes.$binary.base64}`;

        return (
            <View style={styles.productCard}>
                <Image
                    source={{ uri: imageSrc }}
                    style={styles.productImage}
                    resizeMode='cover'
                />
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                        {item.productName || 'Unnamed Product'}
                    </Text>
                    <Text style={styles.productDescription} numberOfLines={2}>
                        {item.productDescription || 'No description available'}
                    </Text>
                    <Text style={styles.productPrice}>
                        {item.productPrice.toFixed(2) || '0.00'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => removeFromWishlist(item.productId.$oid)}
                >
                    <FontAwesomeIcon
                        icon={solidHeart}
                        color="#FF5A5F"
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Wishlist</Text>
                <Text style={styles.itemCount}>{products.length} items</Text>
            </View>

            {products.length === 0 && !isLoading ? (
                <View style={styles.emptyContainer}>
                    <FontAwesomeIcon
                        icon={regularHeart}
                        color="#CCCCCC"
                        size={60}
                        style={styles.emptyIcon}
                    />
                    <Text style={styles.emptyText}>Your wishlist is empty</Text>
                    <Text style={styles.emptySubtext}>Tap the heart icon to save items you love</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.productId.$oid}
                    renderItem={({ item }) => <Product item={item} />}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            <Modal transparent={true} visible={isLoading}>
                <View style={styles.modalLoader}>
                    <Loader />
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    itemCount: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    listContainer: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 20,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#df4b50e7',
    },
    favoriteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    modalLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '40%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});
