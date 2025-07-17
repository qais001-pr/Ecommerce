/* eslint-disable react/self-closing-comp */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, ImageBackground, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

export default function ProductsDetails() {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params || null;

    useEffect(() => {
        console.log(product);
        if (!product) {
            navigation.goBack();
        }
    }, [navigation, product]);

    if (!product) {
        return null;
    }

    const imageSrc = `data:${product.imageContentType};base64,${product.imageBytes.$binary.base64}`;
    // console.log(imageSrc);
    // console.log(product);
    let reviews = product.Reviews;
    console.log(reviews);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header Image Background */}
            <View style={{ height: '50%', width: '100%' }}>
                <ImageBackground
                    source={{ uri: imageSrc }}
                    style={{
                        width: '100%',
                        height: 300,
                    }}
                    resizeMode="contain"
                >
                    {/* Header Overlay */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(167, 154, 83, 0.79)',
                        paddingHorizontal: 10,
                    }}>
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={{ padding: 10 }}
                        >
                            <FontAwesomeIcon
                                icon={faBackward}
                                size={20}
                                color="black"
                            />
                        </Pressable>
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            flex: 1,
                            textAlign: 'center',
                        }}>
                            {product.name}
                        </Text>
                        {/* Spacer to balance the back button */}
                        <View style={{ width: 30 }} />
                    </View>
                </ImageBackground>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 19, color: '#05020cff', marginLeft: 10, paddingRight: 10 }}>
                            Price
                        </Text>
                        <Text style={{ fontSize: 19, color: '#1c2550ff', marginLeft: 10, paddingRight: 10 }}>
                            {product.price}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 19, color: '#05020cff', marginLeft: 10, paddingRight: 10 }}>
                            Quantity
                        </Text>
                        <Text style={{ fontSize: 19, color: '#1c2550ff', marginLeft: 10, paddingRight: 10 }}>
                            {product.quantity}
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row', width: '100%',
                }}>
                    <View style={{ width: '100%', paddingHorizontal: 12 }}>
                        {/* Category Section */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>
                                Category:
                            </Text>
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 18,
                                color: '#555'
                            }}>
                                {product.categories[0]?.name || 'Uncategorized'}
                            </Text>
                        </View>

                        {/* Description Section */}
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 16,
                            marginBottom: 8
                        }}>
                            Description
                        </Text>

                        <Text style={{
                            color: 'rgba(0, 0, 0, 0.8)',
                            fontSize: 16,
                            lineHeight: 24,
                            textAlign: 'left'
                        }}>
                            {product.description}
                        </Text>
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    gap: 15,
                    marginTop: 20
                }}>
                    {/* Primary Action Button */}
                    <Pressable
                        onPress={() => console.log('Add to cart pressed')}
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? '#5a2f0aff' : '#f39c12',
                            width: '100%',
                            height: 50,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 10
                        })}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: '600'
                        }}>
                            Add To Cart
                        </Text>
                    </Pressable>

                    {/* Secondary Action Button */}
                    <Pressable
                        onPress={() => console.log('Buy now pressed')}
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? '#0c6532ff' : '#2ecc71',
                            width: '100%',
                            height: 50,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 10
                        })}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: '600'
                        }}>
                            Buy Now
                        </Text>
                    </Pressable>
                </View>
                {/* Reviews */}
                <Text style={{ fontSize: 25, color: 'black', marginLeft: 15 }}>Reviews</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'black', width: '90%', height: '50%', alignItems: 'center' }}>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
