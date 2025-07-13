import { View, Text, SafeAreaView, FlatList, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/screens/home';
import { faBars, faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useProducts } from '../context/productscontext';
import ProductCard from '../components/productcard';
import Slider from '../components/slider';
import ip from '../config';
export default function Home() {
    const [slidermodal, setslidermodal] = useState(false);
    const {products, setProducts} = useProducts();
    useEffect(() => {
    }, [])
    return (
        <SafeAreaView style={styles.safeareaview}>
            {/* Header  */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setslidermodal(true)}>
                        <FontAwesomeIcon icon={faBars} style={styles.icon} size={25} />
                    </TouchableOpacity>
                    <Text style={[styles.headerText]}>My Shop</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faSearch} style={styles.icon} size={25} />
                    <FontAwesomeIcon icon={faEllipsisV} style={styles.icon} size={25} />
                </View>
            </View>
            {/* Body  */}
            <View style={styles.grid}>
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <View key={item.id.toString()}>
                            <ProductCard item={item} />
                        </View>
                    )}
                />
            </View>
            {/* Slider  */}
            <Modal visible={slidermodal} animationType='fade' transparent={true}>
                <View style={styles.modalView}>
                    <Slider setslidermodal={setslidermodal} />
                </View>
            </Modal>
            {/* Footer  */}
        </SafeAreaView>
    )
}