// components/TaskForm.tsx
import { Picker } from "@react-native-picker/picker"; // Cài thêm: npx expo install @react-native-picker/picker
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { TaskFormData, TaskPriority } from "../types";

interface TaskFormProps {
  control: Control<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
  onSubmit: () => void;
  isEdit?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  control,
  errors,
  onSubmit,
  isEdit,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên công việc</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Text style={styles.label}>Mô tả</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={4}
          />
        )}
      />
      {errors.description && (
        <Text style={styles.errorText}>{errors.description.message}</Text>
      )}

      <Text style={styles.label}>Độ ưu tiên</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              <Picker.Item label="Thấp" value={TaskPriority.Low} />
              <Picker.Item label="Trung bình" value={TaskPriority.Medium} />
              <Picker.Item label="Cao" value={TaskPriority.High} />
            </Picker>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button title={isEdit ? "Cập nhật" : "Thêm mới"} onPress={onSubmit} />
      </View>
    </View>
  );
};
// ... (Styles cho Form)
export default TaskForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 5,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 25,
  },
});
