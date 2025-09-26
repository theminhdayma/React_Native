import UserInfoCard from '@/components/UserInfoCard';
import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Ex1() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      <UserInfoCard
        name="Trần Văn An"
        avatarUrl="https://i.pravatar.cc/150?u=1"
        email="tran.an@example.com"
      />
      <UserInfoCard
        name="Lý Thị Bình"
        avatarUrl="https://i.pravatar.cc/150?u=2"
        email="ly.binh@example.com"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});