// File: Ex5.tsx
import CurrencyInput from "@/components/CurrencyInput";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EXCHANGE_RATE = 25000;

const tryConvert = (
  amount: string,
  convert: (value: number) => number
): string => {
  const input = parseFloat(amount);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 100) / 100;
  return rounded.toString();
};

type Currency = "vnd" | "usd";

export default function Ex5() {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("vnd");

  const handleVndChange = (newAmount: string) => {
    setCurrency("vnd");
    setAmount(newAmount);
  };

  const handleUsdChange = (newAmount: string) => {
    setCurrency("usd");
    setAmount(newAmount);
  };

  const vndAmount =
    currency === "usd"
      ? tryConvert(amount, (val) => val * EXCHANGE_RATE)
      : amount;
  const usdAmount =
    currency === "vnd"
      ? tryConvert(amount, (val) => val / EXCHANGE_RATE)
      : amount;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <Text style={styles.title}>Chuyển đổi tiền tệ</Text>

        <CurrencyInput
          label="Số tiền (VND)"
          value={vndAmount}
          onAmountChange={handleVndChange}
        />

        <CurrencyInput
          label="Số tiền (USD)"
          value={usdAmount}
          onAmountChange={handleUsdChange}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
});
