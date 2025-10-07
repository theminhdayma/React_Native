import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

export default function ProductListScreen() {
  const navigation = useNavigation();
  const { cartItems } = useCart();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product List',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={{ marginRight: 12 }}>
          <Ionicons name="cart" size={24} color="#1976d2" />
          {cartItems.length > 0 && (
            <View style={{
              backgroundColor: '#f44336',
              borderRadius: 9,
              paddingHorizontal: 5,
              position: 'absolute',
              top: -6, right: -10,
            }}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartItems.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>All Products</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          >
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
            >
              <Text style={styles.addBtnText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
          </ProductCard>    
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 14, backgroundColor: "#f8f8f8" },
  head: { fontSize: 22, fontWeight: "700", marginBottom: 16, marginLeft: 16 },
  addBtn: { backgroundColor: "#1976d2", paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 15, textAlign: "center" },
});
