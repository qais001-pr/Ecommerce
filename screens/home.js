/* eslint-disable jsx-quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Modal,
    TouchableOpacity,
    RefreshControl,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { faBars, faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useProducts } from '../context/productscontext';
import ProductCard from '../components/productcard';
import Slider from '../components/slider';
import Loader from '../components/loader';
import { ip } from '../config';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useCategories } from '../context/categoriescontext';
const emptyGhost = require('../Lotties/empty ghost.json');
const { width } = Dimensions.get('window');

export default function Home() {
    const { fetchCategories } = useCategories();
    const [slidermodal, setslidermodal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { products, setProducts, fetchProducts } = useProducts();
    const [isLoading, setisLoading] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProducts();
        await fetchCategories();
        setRefreshing(false);
    };
    const fetProductByCategory = async (id) => {
        try {
            setisLoading(true);
            const res = await axios.get(`${ip}/api/Product/getProduuctByCAtegoryId/${id}`);
            console.log(res.data.result);
            setProducts(res.data.result);
        } catch (error) {
        } finally {
            setisLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => setslidermodal(true)}
                        style={styles.iconButton}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            size={22}
                            color="#2C344A"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Shop</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size={20}
                            color="#2C344A"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesomeIcon
                            icon={faEllipsisV}
                            size={20}
                            color="#2C344A"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Product Grid */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <ProductCard item={item} />
                    </View>
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#2C344A']}
                        tintColor="#2C344A"
                    />
                }
                ListHeaderComponent={
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                }
                ListFooterComponent={<View style={{ height: 30 }} />}
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: Dimensions.get('window').height * 0.7, // Take 70% of screen height
                        paddingHorizontal: 20,
                    }}>
                        {/* Lottie Animation Container */}
                        <View style={{
                            width: '100%',
                            height: 200,
                            marginBottom: 20,
                            overflow: 'hidden',
                            alignItems: 'center',
                        }}>
                            <LottieView
                                source={emptyGhost}
                                autoPlay
                                loop
                                resizeMode='cover'
                                style={{
                                    width: 300, // Fixed width works better than percentages for Lottie
                                    height: 300,
                                    marginTop: -50 // Adjust if needed to center the ghost
                                }}
                            />
                        </View>

                        {/* Text Content */}
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: 8,
                            textAlign: 'center'
                        }}>
                            Boo! Empty Here
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'center',
                            lineHeight: 24,
                            maxWidth: '80%',
                            marginBottom: 24
                        }}>
                            Looks like the ghosts scared all the products away! Try another category or check back later.
                        </Text>

                        {/* Action Button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#6C63FF',
                                paddingHorizontal: 32,
                                paddingVertical: 12,
                                borderRadius: 30,
                                shadowColor: '#6C63FF',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 5
                            }}
                            onPress={onRefresh}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: 16
                            }}>
                                Refresh Products
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />

            {/* Side Menu Modal */}
            <Modal
                visible={slidermodal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setslidermodal(false)}
            >
                <View style={styles.modalOverlay}>
                    <Slider setslidermodal={setslidermodal} fetchProducts={fetProductByCategory} />
                </View>
            </Modal>
            <Modal
                visible={isLoading}
                transparent={true}
                animationType="slide"
                onRequestClose={() => { }}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}
            >
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    top: '55%'
                }}>
                    <Loader />
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#F7F7EE',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#9e9258e3',
        borderBottomWidth: 1,
        borderBottomColor: '#443e21ff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C344A',
        marginLeft: 16,
    },
    iconButton: {
        padding: 8,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C344A',
        marginBottom: 16,
        marginLeft: 12,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    productContainer: {
        width: (width - 36) / 2,
        marginHorizontal: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
