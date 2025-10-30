import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Contact, ContactFormData, ContactTag } from "../../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllContacts,
  getContactById,
  updateContact,
} from "@/apis/apiContact";

function validateVietnamesePhoneNumber(phone: string) {
  return String(phone).match(/^(0|\+84|84)[35789]\d{8}$/);
}

export default function UpdateContactScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<ContactFormData>({
    name: "",
    phone: "",
    tag: "" as ContactTag,
  });

  const [error, setError] = useState({
    name: "",
    phone: "",
    tag: "",
  });

  const { data: contactsQuery } = useQuery({
    queryFn: async () => {
      const response = await getAllContacts();
      return response.data;
    },
    queryKey: ["contacts"],
  });

  const { data: editingContact } = useQuery({
    queryFn: async () => {
      const response = await getContactById(+id);
      return response.data;
    },
    queryKey: ["contact"],
    enabled: !!id,
  });

  const { mutate: updateContactMutation } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ContactFormData }) =>
      updateContact(id, data),
    mutationKey: ["updateContact"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      Alert.alert("Thành công", "Cập nhật liên hệ thành công!");
      router.back();
    },
    onError: () => {
      Alert.alert("Lỗi", "Không thể cập nhật liên hệ!");
    },
  });

  useEffect(() => {
    if (editingContact) {
      setInputValue(editingContact);
    }
  }, [editingContact]);

  const handleSubmit = () => {
    let isValid = true;

    const newError = {
      name: "",
      phone: "",
      tag: "",
    };

    const existingContact = contactsQuery.some(
      (contact: Contact) =>
        contact.phone === inputValue.phone && contact.id !== editingContact.id
    );

    if (!inputValue.name) {
      newError.name = "Tên liên hệ không được để trống!";
      isValid = false;
    }

    if (!inputValue.phone) {
      newError.phone = "Số điện thoại không được để trống!";
      isValid = false;
    } else if (!validateVietnamesePhoneNumber(inputValue.phone)) {
      newError.phone = "Số điện thoại không hợp lệ!";
      isValid = false;
    } else if (existingContact) {
      newError.phone = "Số điện thoại đã tồn tại!";
      isValid = false;
    }

    if (!inputValue.tag) {
      newError.tag = "Vui lòng chọn tag!";
      isValid = false;
    }

    setError(newError);

    if (!isValid) return;

    updateContactMutation({ id: +id, data: inputValue });
  };

  const handleChange = (field: string, value: any) => {
    if (editingContact) {
      setInputValue({
        ...inputValue,
        [field]: value,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Tên liên hệ</Text>
        <TextInput
          style={styles.input}
          value={inputValue.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Nhập tên liên hệ"
          autoCapitalize="words"
        />
        {error.name && <Text style={styles.error}>{error.name}</Text>}

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={inputValue.phone}
          onChangeText={(text) => handleChange("phone", text)}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
        />
        {error.phone && <Text style={styles.error}>{error.phone}</Text>}

        <Text style={styles.label}>Thẻ (Tag)</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={inputValue.tag}
            onValueChange={(text) => handleChange("tag", text)}
            style={styles.picker}
          >
            <Picker.Item label="Chọn tag" value="" />
            <Picker.Item label="Bạn bè" value={ContactTag.FRIEND} />
            <Picker.Item label="Gia đình" value={ContactTag.FAMILY} />
            <Picker.Item label="Đồng nghiệp" value={ContactTag.COLLEAGUE} />
            <Picker.Item label="Khác" value={ContactTag.OTHER} />
          </Picker>
        </View>
        {error.tag && <Text style={styles.error}>{error.tag}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>CẬP NHẬT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 25,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? undefined : 50,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    fontSize: 14,
    color: "red",
  },
});
