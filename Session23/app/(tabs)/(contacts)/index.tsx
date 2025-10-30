import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ListRenderItem,
  Modal,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Contact, ContactSection, ContactTag } from "../../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteContactById, getAllContacts } from "@/apis/apiContact";

const getTagColor = (tag: ContactTag) => {
  switch (tag) {
    case ContactTag.FAMILY:
      return "#FF3B30";
    case ContactTag.FRIEND:
      return "#34C759";
    case ContactTag.COLLEAGUE:
      return "#007AFF";
    default:
      return "#8E8E93";
  }
};

const processContacts = (
  contacts: Contact[],
  query: string
): ContactSection[] => {
  const normalizedQuery = query.toLowerCase();

  const filtered = contacts.filter(
    (c) =>
      !c.isBlocked &&
      (c.name.toLowerCase().includes(normalizedQuery) ||
        c.phone.includes(normalizedQuery))
  );

  const groups = filtered.reduce((acc, contact) => {
    const letter = contact.name[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(contact);
    return acc;
  }, {} as Record<string, Contact[]>);

  return Object.keys(groups)
    .sort()
    .map((letter) => ({
      title: letter,
      data: groups[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));
};

export default function ContactListScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number>(0);

  const [refresh, setRefresh] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setRefresh((r) => r + 1);
    }, [])
  );

  const {
    data: contactsQuery,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await getAllContacts();
      return response.data;
    },
    queryKey: ["contacts"],
  });

  const { mutate: deleteContactMutation } = useMutation({
    mutationFn: () => deleteContactById(selectedContactId),
    mutationKey: ["deleteContact"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      Alert.alert("Thành công", "Xóa liên hệ thành công!");
    },
    onError: () => {
      Alert.alert("Lỗi", "Không thể xóa liên hệ!");
    },
  });

  const contactSections = useMemo(
    () => processContacts(contactsQuery || [], searchQuery),
    [contactsQuery, searchQuery]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Danh bạ",
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/(tabs)/(contacts)/add")}>
          <Ionicons
            name="add-circle"
            size={30}
            color="#007AFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  const openDeleteModal = (id: number) => {
    setSelectedContactId(id);
    setModalVisible(true);
  };

  const handleDelete = () => {
    deleteContactMutation();
    setModalVisible(false);
  };

  const renderContactItem: ListRenderItem<Contact> = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`/(tabs)/(contacts)/${item.id}`)}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPhone}>{item.phone}</Text>
        <View style={styles.tagContainer}>
          <Text
            style={[
              styles.itemTag,
              {
                color: getTagColor(item.tag),
                borderColor: getTagColor(item.tag),
              },
            ]}
          >
            {item.tag}
          </Text>
        </View>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/(contacts)/edit",
              params: { id: item.id },
            })
          }
        >
          <Ionicons name="pencil" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openDeleteModal(item.id)}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="trash" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />{" "}
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Lỗi khi tải danh bạ.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#8E8E93"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc SĐT..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <SectionList
        sections={contactSections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContactItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Danh bạ trống</Text>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa liên hệ này?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setModalVisible(false)} />
              <Pressable style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f4f4f8",
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPhone: { fontSize: 14, color: "#555", marginTop: 2 },
  tagContainer: { flexDirection: "row", marginTop: 4 },
  itemTag: {
    fontSize: 12,
    fontWeight: "500",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 6,
  },
  itemActions: { flexDirection: "row" },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 16, color: "#aaa", marginTop: 10 },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: { marginBottom: 20, textAlign: "center", fontSize: 16 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginLeft: 15,
  },
  deleteButtonText: { color: "white", fontWeight: "bold", textAlign: "center" },
});
