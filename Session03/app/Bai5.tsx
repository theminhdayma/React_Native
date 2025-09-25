import React from 'react';
import { View, Text, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';

export default function Bai5() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Trang chủ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: Platform.select<ViewStyle>({
    ios: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center'
    },
    android: {
      backgroundColor: '#2196F3',
      elevation: 4,
      height: 56,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
    }
  }) as ViewStyle,
  title: Platform.select<TextStyle>({
    ios: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#000',
      textAlign: 'center',
    },
    android: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#fff',
      textAlign: 'left',
    }
  }) as TextStyle,
});
