/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
/* eslint-disable eol-last */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable curly */
/* eslint-disable react/no-unstable-nested-components */
import { View, Text, Modal, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { ip } from '../config';
import { useAuth } from '../context/authcontext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/loader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart as emptyCartIcon } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart, faPlus, faMinus, faTrash, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import Error from '../components/error';
export default function CartScreen({ navigation }) {
    const { user } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [selectedItems, setSelectedItems] = useState({});
    const [error, seterror] = useState(false);
    const [info, setinfo] = useState('')

    const fetchProducts = useCallback(async () => {
        if (!user?._id) return;
        try {
            setLoading(true);
            const response = await axios.get(`${ip}/api/AddToCart/GetAllProducts/${user._id}`);
            setProducts(response.data);
            const initialQuantities = {};
            response.data.forEach(item => {
                initialQuantities[item.productId.$oid] = 1;
            });
            setQuantities(initialQuantities);
            const initialSelected = {};
            response.data.forEach(item => {
                initialSelected[item.productId.$oid] = true;
            });
            setSelectedItems(initialSelected);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const removeFromCart = async (productId) => {
        try {
            setLoading(true);
            await axios.delete(`${ip}/api/AddToCart/Delete/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error("Error removing from cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));
    };

    const toggleItemSelection = (productId) => {
        setSelectedItems(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const calculateTotal = () => {
        return products.reduce((total, item) => {
            if (selectedItems[item.productId.$oid]) {
                return total + (item.productPrice * quantities[item.productId.$oid]);
            }
            return total;
        }, 0).toFixed(2);
    };

    const getSelectedProducts = () => {
        return products.filter(item => selectedItems[item.productId.$oid]);
    };
    const TemporaryInfo = (m) => {
        seterror(true);
        setinfo(m);
        setTimeout(() => { seterror(false); }, 1500);
    };
    const handleCheckout = () => {
        const selectedProducts = getSelectedProducts();
        if (selectedProducts.length === 0) {
            TemporaryInfo('No Items Selected', 'Please select at least one item to proceed to checkout.');
            return;
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [fetchProducts])
    );

    const Product = ({ item }) => {
        const imageSrc = `data:${item.imageContent};base64,${item.imagebytes.$binary.base64}`;
        const currentQuantity = quantities[item.productId.$oid] || 1;
        const isSelected = selectedItems[item.productId.$oid];

        return (
            <View style={styles.productCard}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleItemSelection(item.productId.$oid)}
                >
                    <FontAwesomeIcon
                        icon={isSelected ? faCheckSquare : faSquare}
                        size={20}
                        color={isSelected ? '#FF5A5F' : '#CCC'}
                    />
                </TouchableOpacity>

                <Image
                    source={{ uri: imageSrc }}
                    style={styles.productImage}
                    resizeMode='contain'
                />
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                        {item.productName || 'Unnamed Product'}
                    </Text>
                    <Text style={styles.productDescription} numberOfLines={2}>
                        {item.productDescription || 'No description available'}
                    </Text>
                    <Text style={styles.productPrice}>
                        {item.productPrice.toFixed(2)}
                    </Text>
                    {item.quantity && (
                        <Text style={styles.stockWarning}>
                            Only {item.quantity} left in stock
                        </Text>
                    )}

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.productId.$oid, currentQuantity - 1)}
                        >
                            <FontAwesomeIcon icon={faMinus} size={16} color="#555" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{currentQuantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.productId.$oid, currentQuantity + 1)}
                        >
                            <FontAwesomeIcon icon={faPlus} size={16} color="#555" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeFromCart(item.productId.$oid)}
                >
                    <FontAwesomeIcon icon={faTrash} color="#FF5A5F" size={20} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
                <Text style={styles.itemCount}>{products.length} items</Text>
            </View>

            {products.length === 0 && !isLoading ? (
                <View style={styles.emptyContainer}>
                    <FontAwesomeIcon
                        icon={emptyCartIcon}
                        color="#CCCCCC"
                        size={60}
                        style={styles.emptyIcon}
                    />
                    <Text style={styles.emptyText}>Your Cart is empty</Text>
                    <Text style={styles.emptySubtext}>Add items to get started</Text>
                    <TouchableOpacity
                        style={styles.continueShoppingButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.productId.$oid}
                        renderItem={({ item }) => <Product item={item} />}
                        contentContainerStyle={styles.listContainer}
                    />
                    <View style={styles.footer}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total:</Text>
                            <Text style={styles.totalAmount}>{calculateTotal()}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={handleCheckout}
                        >
                            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <Modal transparent={true} visible={isLoading}>
                <View style={styles.modalLoader}>
                    <Loader />
                </View>
            </Modal>
            <Modal transparent={true} visible={error}>
                <View style={styles.modalLoader}>
                    <Error message={info} />
                </View>
            </Modal>
        </SafeAreaView>
    );
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
        backgroundColor: '#FFF',
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
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 10,
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 8,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5A5F',
        marginBottom: 8,
    },
    stockWarning: {
        fontSize: 12,
        color: '#E67E22',
        marginBottom: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    quantityButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#F5F5F5',
    },
    quantityText: {
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
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
        marginBottom: 20,
    },
    continueShoppingButton: {
        backgroundColor: '#FF5A5F',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    continueShoppingText: {
        color: '#FFF',
        fontWeight: '600',
    },
    footer: {
        bottom: 50,
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    totalText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF5A5F',
    },
    checkoutButton: {
        backgroundColor: '#FF5A5F',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    checkoutButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});