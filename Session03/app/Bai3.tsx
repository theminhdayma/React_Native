import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Heart, MessageCircle, Send } from 'lucide-react-native';

export default function Bai3() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>theminhdayma</Text>
      </View>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/b8/86/b2/b886b20ce517adae1f8b2fb5bad00fe6.jpg' }}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.actionBar}>
        <Heart size={28} color="#EF4444" />
        <MessageCircle size={28} color="#3B82F6" />
        <Send size={28} color="#22C55E" />
      </View>
      <Text style={styles.description}>
        <Text style={styles.username}>Theminhdayma</Text>
        Một buổi chiều yên bình trên bờ biển 🌊☀️
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#222',
  },
});