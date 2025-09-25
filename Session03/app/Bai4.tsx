import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, CONTAINER_STYLES } from '../style/GlobalStyles';

export default function Bai4() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
  <View>
      <Image
        source={{ uri: 'https://rikkei.edu.vn/wp-content/uploads/2024/12/logo-rikkei2.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={COLORS.placeholder}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 110,
    marginBottom: SPACING.xl,
  },
  input: {
    width: 280,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZES.medium,
    backgroundColor: COLORS.inputBg,
  },
  button: {
    width: 280,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
});