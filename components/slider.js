/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useCategories } from '../context/categoriescontext';
import { styles } from '../styles/components/slider';
export default function Slider({ setslidermodal, fetchProducts }) {
    const { categories } = useCategories();
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [animation] = useState(new Animated.Value(0));
    const toggleCategories = () => {
        Animated.timing(animation, {
            toValue: isCategoriesExpanded ? 0 : 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
        setIsCategoriesExpanded(!isCategoriesExpanded);
    };

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.min(categories.length * 50, 300)],
    });
    const handleCategorySelect = async (item) => {
        console.log(item.id);
        setSelectedCategory(item.id);
        await fetchProducts(item.id);

    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item.id && styles.activeCategory
            ]}
            onPress={() => {
                handleCategorySelect(item);
                setslidermodal(false);
            }}
        >
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>My Shop</Text>
                <Pressable
                    onPress={() => setslidermodal(false)}
                    style={styles.closeButton}
                    accessibilityLabel="Close menu"
                    hitSlop={10}
                >
                    <FontAwesomeIcon icon={faTimes} size={22} color="#666" />
                </Pressable>
            </View>

            {/* Categories Menu Item */}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={toggleCategories}
                activeOpacity={0.7}
            >
                <Text style={styles.menuText}>Category </Text>
                <FontAwesomeIcon
                    icon={isCategoriesExpanded ? faChevronUp : faChevronDown}
                    size={16}
                    color="#888"
                />
            </TouchableOpacity>

            {/* Categories List - Expanded below the tile */}
            <Animated.View style={[styles.categoryList, { height: heightInterpolation }]}>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCategoryItem}
                    scrollEnabled={categories.length > 6}
                    showsVerticalScrollIndicator={false}
                />
            </Animated.View>

            {/* Additional menu items */}
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>My Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
