import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Contact } from "./_layout";

interface Props {
  contact: Contact;
  onPress: (contact: Contact) => void;
}

export default function ContactListItem({ contact, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(contact)} style={styles.container}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 12, borderBottomWidth: 1, borderColor: "#ccc" },
  name: { fontWeight: "bold", fontSize: 16 },
  phone: { color: "#777", fontSize: 14, marginTop: 4 },
});
