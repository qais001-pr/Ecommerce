
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable curly */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackward, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../context/authcontext';
import Error from '../components/error';

function ProductHeader({ product, onBack }) {

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <FontAwesomeIcon icon={faBackward} size={22} color="#2C344A" />
      </Pressable>
      <Text numberOfLines={1} style={styles.headerTitle}>
        {product?.name || 'No Name'}
      </Text>
      <View style={{ width: 22 }} />
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Reviews({ reviews }) {
  return reviews.map((review) => (
    <View key={review._id?.$oid || Math.random()} style={styles.reviewCard}>
      <Text style={styles.reviewUser}>
        {(review.User?.Name || 'Anonymous').toUpperCase()}
      </Text>
      <View style={styles.reviewRow}>
        <FontAwesomeIcon icon={faQuoteLeft} size={18} color="#A79953" style={{ marginRight: 7 }} />
        <Text style={styles.reviewText}>{review.Comments}</Text>
      </View>
    </View>
  ));
}

export default function ProductsDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params || {};
  const [isFav, setIsFav] = useState(false);
  const { user } = useAuth()
  const [showerror, setshowerror] = useState(false)

  useEffect(() => {
    if (!product) {
      Alert.alert('Error', 'Product not found.', [
        { text: 'Go Back', onPress: () => navigation.goBack() },
      ]);
    }
  }, [navigation, product]);

  if (!product) return null;

  const imageSrc = `data:${product.imageContentType};base64,${product.image?.$binary?.base64 || ''}`;
  const category = product.Categories && product.Categories[0]?.name
    ? product.Categories[0].name
    : 'Uncategorized';


  const toggleFavourite = () => {
    if (!user) {
      setshowerror(true)
      setTimeout(() => { setshowerror(false) }, 2000)
      return;
    }
    setIsFav(true)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ProductHeader
        product={product}
        onBack={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageSrc }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.infoSection}>
            <InfoRow label="Price" value={`${product.price?.toFixed(2) || "-"}`} />
            {/* <InfoRow label="Quantity" value={product.quantity || "-"} /> */}
            <InfoRow label="Category" value={category} />
            <Pressable onPress={toggleFavourite} style={styles.favButton}>
              <FontAwesomeIcon
                icon={isFav ? solidHeart : regularHeart}
                color={isFav ? 'red' : '#2C344A'}
                size={22}
              />
            </Pressable>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}> Availability</Text>
            {
              product.quantity > 0 ? <Text style={styles.infoLabel}> InStock</Text> :
                <Text style={[styles.infoLabel, { fontSize: 15, color: 'red' }]}> Out of Stock</Text>
            }
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>Huppy Up! <Text style={[styles.infoLabel, { fontSize: 15, color: 'rgba(62, 85, 44, 1)' }]}> {product.quantity} items are left </Text></Text>
          </View>
          <View style={styles.buttonGroup}>
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: pressed ? '#c47c0f' : '#f8af36' }
              ]}
              onPress={() => console.log('Add To Cart')}
            >
              <Text style={styles.buttonText}>Add To Cart</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: pressed ? '#145a38' : '#2ecc71' }
              ]}
              onPress={() => console.log('Buy Now')}
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description || 'No description provided.'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {
              (!product.reviewsData || !Array.isArray(product.reviewsData) || product.reviewsData.length === 0) ?
                <Text style={styles.noReviews}>No reviews yet.</Text> :
                <Reviews reviews={product.reviewsData} />
            }
          </View>
        </View>
        <Modal visible={showerror} transparent={true}>
          <Error message="Please Login or SignUp" />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7EE'
  },
  headerContainer: {
    backgroundColor: '#F7F7EE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 6
  },
  headerTitle: {
    color: '#2C344A',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    padding: 20,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  infoRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 100,
    marginBottom: 10,
  },
  infoLabel: {
    color: '#A79953',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  favButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  section: {
    marginBottom: 22
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#474747',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
  actionButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  noReviews: {
    color: '#AAA',
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: 8,
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 13,
    marginBottom: 11,
    shadowColor: '#A79953',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#a78f3f',
    marginBottom: 3,
    letterSpacing: 1,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  reviewText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 20,
    flex: 1,
    flexWrap: 'wrap',
  },
});
