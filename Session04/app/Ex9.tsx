// File: Ex9.tsx
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface FormData {
  name: string;
  age: string;
  phone: string;
  address: string;
}

export default function Ex9() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);
  const handleSubmit = () => {
    Alert.alert("Hoàn tất", "Đã gửi thông tin thành công!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1 formData={formData} handleInputChange={handleInputChange} />
        );
      case 2:
        return (
          <Step2 formData={formData} handleInputChange={handleInputChange} />
        );
      case 3:
        return <Step3 formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.progressText}>Bước {step} / 3</Text>
        {renderStep()}
      </View>

      <View style={styles.navigation}>
        {step > 1 && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={handleBack}
          >
            <Text style={styles.buttonText}>QUAY LẠI</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={step === 3 ? handleSubmit : handleNext}
        >
          <Text style={styles.buttonText}>
            {step === 3 ? "HOÀN TẤT" : "TIẾP THEO"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: "#f0f2f5" 
},
  content: { 
    justifyContent: "center", 
    paddingHorizontal: 20 
},
  progressText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  navigation: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  backButton: { backgroundColor: "#6c757d", marginRight: 10 },
  nextButton: { backgroundColor: "#007bff" },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
