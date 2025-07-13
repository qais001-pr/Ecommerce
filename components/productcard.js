import { View, Text } from 'react-native'
import React from 'react'
export default function ProductCard({ item }) {
    // console.log(item)
    return (
        <View>
            <Text style={{ fontSize: 30, color: 'black' }}>{item.id}</Text>
            <Text style={{ fontSize: 30, color: 'white' }}>{item.name}</Text>
        </View>
    )
}