import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactForm from "./ContactForm";
import ContactListItem from "./ContactListItem";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

const STORAGE_KEY = "CONTACTS";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setContacts(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onAddNew = () => {
    setSelectedContact(null);
    setModalVisible(true);
  };

  const onEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const onSaveContact = (contact: Contact) => {
    if (contact.id) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );
      Alert.alert("Thông báo", "Sửa liên hệ thành công");
    } else {
      setContacts((prev) => [
        ...prev,
        { ...contact, id: Date.now().toString() },
      ]);
      Alert.alert("Thông báo", "Thêm liên hệ thành công");
    }
    setModalVisible(false);
  };

  const onDeleteContact = (contact: Contact) => {
    setContacts((prev) => prev.filter((c) => c.id !== contact.id));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh bạ</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddNew}>
          <Text style={styles.addButtonText}>THÊM MỚI</Text>
        </TouchableOpacity>
      </View>

      {contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Danh bạ của bạn trống.</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactListItem contact={item} onPress={onEditContact} />
          )}
        />
      )}

      <Modal visible={modalVisible} animationType="slide">
        <ContactForm
          contact={selectedContact}
          onSave={onSaveContact}
          onDelete={onDeleteContact}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerText: { fontSize: 20, fontWeight: "bold" },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
