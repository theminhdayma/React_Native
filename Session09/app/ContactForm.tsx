import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Contact } from "./_layout";

interface Props {
  contact: Contact | null;
  onSave: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onClose: () => void;
}

export default function ContactForm({
  contact,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const [name, setName] = useState(contact?.name || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [email, setEmail] = useState(contact?.email || "");

  useEffect(() => {
    setName(contact?.name || "");
    setPhone(contact?.phone || "");
    setEmail(contact?.email || "");
  }, [contact]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Lỗi", "Tên không được để trống");
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Lỗi", "Số điện thoại không được để trống");
      return;
    }
    onSave({
      id: contact?.id || "",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Xác nhận Xóa",
      `Bạn có chắc chắn muốn xóa "${contact?.name}"?`,
      [
        { text: "HỦY", style: "cancel" },
        {
          text: "XÓA",
          style: "destructive",
          onPress: () => contact && onDelete(contact),
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {contact ? "Sửa Liên hệ" : "Thêm Liên hệ mới"}
        </Text>
        <Button title="ĐÓNG" onPress={onClose} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email (không bắt buộc)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="LƯU" onPress={handleSave} />
      {contact && (
        <View style={{ marginTop: 12 }}>
          <Button title="XÓA LIÊN HỆ" color="red" onPress={confirmDelete} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: { fontWeight: "bold", fontSize: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
