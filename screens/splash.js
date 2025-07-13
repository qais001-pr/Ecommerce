import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/screens/splashStyle';
import Loader from '../components/loader';
import { useCategories } from '../context/categoriescontext';
import { useProducts } from '../context/productscontext';

export default function Splash() {
  const navigation = useNavigation();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  // Data loading states from context
  const { loadingCategories, categories } = useCategories();
  const { loadingProducts, products } = useProducts();

  useEffect(() => {
    // Run fade-in and slide-up animations in parallel on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    // Navigate to Home only if both categories and products are loaded and valid arrays
    if (
      !loadingCategories &&
      !loadingProducts &&
      Array.isArray(categories) &&
      categories.length > 0 &&
      Array.isArray(products) &&
      products.length > 0
    ) {
      const timer = setTimeout(() => {
        navigation.navigate('tabBottomNav');
      }, 1000); // Delay for animation or splash visibility

      // Cleanup timer if component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
  }, [loadingCategories, loadingProducts, categories, products, navigation]);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Animated.View
        style={[
          styles.text,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.text}>My Shop</Text>
      </Animated.View>

      <View style={styles.loadercontainer}>
        <Loader />
      </View>
    </SafeAreaView>
  );
}
