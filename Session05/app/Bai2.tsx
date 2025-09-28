import BusinessCard from '@/components/BusinessCard';
import React from 'react'

import { StyleSheet, ScrollView } from "react-native";


export default function Bai2() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BusinessCard
        avatarUrl="https://i.pravatar.cc/150?img=1"
        name="Nguyễn Thế Minh"
        jobTitle="Lập trình viên React Native"
        contactInfo="SĐT: 0364577211"
      />
      <BusinessCard
        avatarUrl="https://i.pravatar.cc/150?img=2"
        name="Trần Thị Minh Sâm"
        jobTitle="Designer"
        contactInfo="Email: tranthiminhsam@example.com"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
});
