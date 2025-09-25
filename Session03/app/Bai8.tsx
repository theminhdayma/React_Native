import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const COVER_IMAGE = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80';
const AUTHOR_AVATAR = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';
const AUTHOR_NAME = 'Son Nguyen';
const TITLE = 'React Native: Xây dựng ứng dụng di động đa nền tảng';
const CONTENT = `React Native đã cách mạng hóa lĩnh vực phát triển ứng dụng di động bằng cách cho phép các nhà phát triển xây dựng các ứng dụng gốc cho cả iOS và Android từ một cơ sở mã duy nhất. Được phát triển bởi Facebook, framework này sử dụng thư viện React, một trong những thư viện JavaScript phổ biến nhất để xây dựng giao diện người dùng.`;

const { width: windowWidth } = Dimensions.get('window');
const TITLE_FONT_SIZE = windowWidth > 400 ? 28 : 22;
const CONTENT_FONT_SIZE = windowWidth > 400 ? 18 : 15;

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: COVER_IMAGE }} style={styles.cover} resizeMode="cover" />
      <Text style={[styles.title, { fontSize: TITLE_FONT_SIZE }]}> {TITLE} </Text>
      <View style={styles.authorRow}>
        <Image source={{ uri: AUTHOR_AVATAR }} style={styles.avatar} />
        <Text style={styles.authorName}>{AUTHOR_NAME}</Text>
      </View>
      <Text style={[styles.content, { fontSize: CONTENT_FONT_SIZE }]}> {CONTENT} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 18,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#222',
    textAlign: 'left',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  content: {
    fontFamily: 'Roboto-Regular',
    color: '#222',
    lineHeight: 26,
    textAlign: 'justify',
  },
});