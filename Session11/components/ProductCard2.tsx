import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product2 } from '../types/Product';
import ProductStatusBadge from './ProductStatusBadge';

type Props = {
  product: Product2;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};
export default function ProductCard2({ product, onPress, onEdit, onDelete }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()} VND</Text>
        <ProductStatusBadge status={product.status} />
      </View>
      <TouchableOpacity onPress={onEdit} style={styles.icon}><Ionicons name="pencil" size={20} color="#0359c0" /></TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.icon}><Ionicons name="trash" size={22} color="#e53935" /></TouchableOpacity>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 14, backgroundColor: '#fff', marginVertical: 7, borderRadius: 10, elevation: 1, alignItems: 'center' },
  name: { fontWeight: 'bold', fontSize: 17 },
  price: { color: '#e0a100', marginVertical: 2, fontSize: 15 },
  icon: { marginLeft: 14 }
});
