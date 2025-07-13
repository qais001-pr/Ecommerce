import { View, Text } from 'react-native'
import React from 'react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
export default function Slider({ setslidermodal }) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            width: '50%',
        }}
            onTouchEnd={() => setslidermodal(false)}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 50
            }}>
                <Text style={{
                    marginLeft: 20,
                    fontSize: 20, color: 'black', fontWeight: 'bold'
                }}>Slider</Text>
                <FontAwesomeIcon icon={faClose} style={{ color: 'black', marginRight: 20 }} size={25} onPress={() => setslidermodal(false)} />
            </View>
        </View>
    )
}