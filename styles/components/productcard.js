
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fbad',
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        marginBottom: 15,
        flex: 1,
    },

    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    infoContainer: {
        padding: 12,
        position: 'relative',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2a9d8f',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 6,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});
