import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const termsText = `Chào mừng bạn đến với ứng dụng của chúng tôi. Bằng cách truy cập hoặc sử dụng ứng dụng, bạn đồng ý bị ràng buộc bởi các điều khoản và điều kiện này.

1. Chấp nhận Điều khoản
Bằng việc sử dụng Dịch vụ, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý tuân thủ các Điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, bạn không được phép truy cập Dịch vụ.

2. Thay đổi Điều khoản
Chúng tôi có quyền sửa đổi hoặc thay thế các Điều khoản này vào bất kỳ lúc nào theo quyết định riêng của chúng tôi. Nếu một bản sửa đổi là quan trọng, chúng tôi sẽ cố gắng cung cấp thông báo ít nhất 30 ngày trước khi bất kỳ điều khoản mới nào có hiệu lực. Điều gì cấu thành một thay đổi quan trọng sẽ được xác định theo quyết định riêng của chúng tôi.

3. Quyền riêng tư
Chính sách Bảo mật của chúng tôi mô tả cách chúng tôi xử lý thông tin bạn cung cấp cho chúng tôi khi bạn sử dụng Dịch vụ của chúng tôi. Bạn hiểu rằng thông qua việc sử dụng Dịch vụ, bạn đồng ý với việc thu thập và sử dụng (như được quy định trong Chính sách Bảo mật) thông tin này.

4. Nội dung
Dịch vụ của chúng tôi cho phép bạn đăng, liên kết, lưu trữ, chia sẻ và cung cấp một số thông tin, văn bản, đồ họa, video hoặc tài liệu khác ("Nội dung"). Bạn chịu trách nhiệm về Nội dung mà bạn đăng lên Dịch vụ, bao gồm cả tính hợp pháp, độ tin cậy và sự phù hợp của nó.

5. Chấm dứt
Chúng tôi có thể chấm dứt hoặc đình chỉ quyền truy cập của bạn vào Dịch vụ của chúng tôi ngay lập tức, mà không cần thông báo trước hoặc chịu trách nhiệm pháp lý, vì bất kỳ lý do gì, bao gồm nhưng không giới hạn nếu bạn vi phạm các Điều khoản.`;

export default function Ex4() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Điều khoản sử dụng</Text>
        <ScrollView>
          <Text style={styles.content}>{termsText}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: "#555",
    textAlign: "justify",
  },
});
