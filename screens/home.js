/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
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
    Platform,
    TextInput,
    Keyboard
} from 'react-native';
import React, { useRef, useState } from 'react';
import { faBars, faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
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
    const [btnref, setbtnref] = useState(false);
    const [search, setsearch] = useState(false);
    const [query, setquery] = useState('');
    const refquery = useRef(null);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProducts();
        await fetchCategories();
        setRefreshing(false);
        setbtnref(false);
    };

    const fetProductByCategory = async (id) => {
        try {
            setisLoading(true);
            const res = await axios.get(`${ip}/api/Product/getProduuctByCAtegoryId/${id}`);
            console.log(res.data.result);
            setProducts(res.data.result);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        } finally {
            setisLoading(false);
        }
    };

    const searchProduct = async () => {
        try {
            if (!query) {
                Keyboard.dismiss();
                setsearch(false);
                return;
            }
            Keyboard.dismiss();
            setsearch(false);
            setquery('');
            const response = await axios.get(`${ip}/api/Product/getsearchproducts/${query}`);
            setProducts(response.data.data);
        } catch (error) {
        }
    };

    const handleCloseSearch = () => {
        setsearch(false);
        setquery('');
        fetchProducts(); // Reset to original products
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
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => {
                            setsearch(true);
                            refquery.current?.focus();
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faSearch}
                            size={20}
                            color="#2C344A"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Modal */}
            {search && (
                <View style={[styles.header, { paddingVertical: 7 }]}>
                    <View style={styles.headerLeft}>
                        <FontAwesomeIcon icon={faSearch} size={15} color="#2C344A" />
                        <TextInput
                            value={query}
                            style={styles.searchInput}
                            onChangeText={setquery}
                            ref={refquery}
                            placeholderTextColor={'#666'}
                            placeholder='Type name here'
                            maxLength={30}
                            onSubmitEditing={searchProduct}
                            autoFocus={true}
                        />
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            onPress={handleCloseSearch}
                            style={styles.iconButton}
                        >
                            <FontAwesomeIcon
                                icon={faClose}
                                size={22}
                                color="#2C344A"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

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
                contentContainerStyle={[
                    styles.listContent,
                    products.length === 0 && { flexGrow: 1 }
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#2C344A']}
                        tintColor="#2C344A"
                    />
                }
                ListHeaderComponent={
                    products.length > 0 && (
                        <Text style={styles.sectionTitle}>Featured Products</Text>
                    )
                }
                ListFooterComponent={<View style={{ height: 30 }} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.animationContainer}>
                            <LottieView
                                source={emptyGhost}
                                autoPlay
                                loop
                                style={styles.animation}
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            Boo! Empty Here
                        </Text>

                        <Text style={styles.emptyText}>
                            Looks like the ghosts scared all the products away! Try another category or check back later.
                        </Text>

                        <TouchableOpacity
                            style={styles.refreshButton}
                            onPress={() => {
                                setbtnref(true);
                                onRefresh();
                            }}
                            disabled={btnref}
                        >
                            <Text style={styles.refreshButtonText}>
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
                    <Slider
                        setslidermodal={setslidermodal}
                        fetchProducts={fetProductByCategory}
                    />
                </View>
            </Modal>

            {/* Loading Modal */}
            <Modal
                visible={isLoading}
                transparent={true}
                animationType="fade"
                onRequestClose={() => { }}
            >
                <View style={styles.loaderContainer}>
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
        gap: 1,
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
    searchInput: {
        paddingLeft: 20,
        fontSize: 16,
        color: 'black',
        width: '80%',
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.7,
        paddingHorizontal: 20,
    },
    animationContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        overflow: 'hidden',
        alignItems: 'center',
    },
    animation: {
        width: 300,
        height: 300,
        marginTop: -50
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center'
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: '80%',
        marginBottom: 24
    },
    refreshButton: {
        backgroundColor: '#9e9258e3',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 30,
        shadowColor: '#24200fe3',
        shadowOffset: { width: 5, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 80,
        elevation: 10
    },
    refreshButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});
