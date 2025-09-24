import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialMessages = [
  { id: "1", text: "Chào cậu, cậu khỏe không?", sender: "other" },
  { id: "2", text: "Tớ khỏe, cảm ơn cậu. Còn cậu thì sao?", sender: "me" },
  { id: "3", text: "Tớ cũng ổn. Đang làm gì đó?", sender: "other" },
  {
    id: "4",
    text: "Tớ đang học React Native, khá là thú vị đó!",
    sender: "me",
  },
];

export default function Ex7() {
    const idCount = 0;
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
      if (inputText.trim().length > 0) {
        idCount + 1;
      const newMessage = {
        id: idCount.toString(),
        text: inputText,
        sender: "me",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === "me"
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <Text
                style={
                  message.sender === "me"
                    ? styles.myMessageText
                    : styles.otherMessageText
                }
              >
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Nhắn tin..."
            placeholderTextColor="#9E9E9E"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },
  myMessageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  otherMessageText: {
    color: "#000000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
