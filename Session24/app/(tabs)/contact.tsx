import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  SectionList,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import {
  Search,
  UserPlus,
  UserRoundPlus,
  Contact,
  Phone,
  Video,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockFriends = [
  {
    title: "A",
    data: [
      {
        id: "1",
        name: "Ái Vân",
        avatar: "https://i.pravatar.cc/150?img=26",
      },
    ],
  },
  {
    title: "B",
    data: [
      {
        id: "2",
        name: "Ba Nam",
        avatar: "https://i.pravatar.cc/150?img=33",
      },
      {
        id: "3",
        name: "Bảo Ngọc",
        avatar: "https://i.pravatar.cc/150?img=31",
      },
      { id: "4", name: "Bee", avatar: "https://i.pravatar.cc/150?img=12" },
      { id: "5", name: "Boss", avatar: "https://i.pravatar.cc/150?img=11" },
    ],
  },
  {
    title: "C",
    data: [
      {
        id: "6",
        name: "Cường",
        avatar: "https://i.pravatar.cc/150?img=56",
      },
    ],
  },
];

const ALPHABET = "A,B,C,D,H,I,K,L,M,N,P,Q,R,T,V,X,Y,#".split(",");

const Header = () => (
  <View className="flex-row items-center gap-4 bg-[#00ADEF] px-4 py-3 space-x-4">
    <View className="flex-1 flex-row items-center gap-3 bg-[#00ADEF] rounded-lg px-3 py-1.5 space-x-2">
      <Search className="text-[#F2E4E4]" size={20} />
      <TextInput
        placeholder="Tìm bạn bè, tin nhắn..."
        placeholderTextColor="#F2E4E4"
        className="flex-1 text-white p-0 m-0 text-base"
      />
    </View>
    <Pressable>
      <UserPlus className="text-white" size={24} />
    </Pressable>
  </View>
);

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Bạn bè");
  const tabs = ["BẠN BÈ", "NHÓM", "QR"];

  return (
    <View className="flex-row justify-around bg-white border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <Pressable
            key={tab}
            className="items-center py-3"
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`font-semibold ${
                isActive ? "text-[#00ADEF]" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
            <View
              className={`h-0.5 w-10 mt-1 ${
                isActive ? "bg-[#00ADEF]" : "bg-transparent"
              }`}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const StaticOptions = () => (
  <View className="bg-white border-b border-gray-200">
    <Pressable className="flex-row items-center gap-3 p-4 space-x-4">
      <View className="w-10 h-10 bg-[#00ADEF] rounded-full justify-center items-center">
        <UserRoundPlus className="text-white" size={20} />
      </View>
      <Text className="text-base font-medium">Lời mời kết bạn</Text>
    </Pressable>
    <Pressable className="flex-row items-center gap-3 px-4 pt-2 pb-4 space-x-4">
      <View className="w-10 h-10 bg-[#00ADEF] rounded-full justify-center items-center">
        <Contact className="text-white" size={20} />
      </View>
      <View>
        <Text className="text-base font-medium">Danh bạ máy</Text>
        <Text className="text-sm text-gray-500">Các liên hệ có dùng Zalo</Text>
      </View>
    </Pressable>
  </View>
);

const FriendTabs = () => (
  <View className="flex-row space-x-2 bg-gray-100 px-4 py-2 border-b border-gray-200">
    <Pressable className="bg-white rounded-full py-1.5 px-4 shadow shadow-black/10">
      <Text className="font-semibold text-black text-sm">Tất cả</Text>
    </Pressable>
    <Pressable className="py-1.5 px-4">
      <Text className="font-semibold text-gray-500 text-sm">Mới truy cập</Text>
    </Pressable>
  </View>
);

const FriendRow = ({ item }: { item: any }) => (
  <Pressable className="flex-row items-center px-4 py-2.5 bg-white">
    <Image
      source={{ uri: item.avatar }}
      className="w-14 h-14 rounded-full mr-4 bg-gray-200"
    />
    <Text className="flex-1 text-base font-medium text-black">{item.name}</Text>
    <View className="flex-row gap-3 space-x-4">
      <Pressable>
        <Phone className="text-gray-400" size={22} />
      </Pressable>
      <Pressable>
        <Video className="text-gray-400" size={22} />
      </Pressable>
    </View>
  </Pressable>
);

const SectionHeader = ({ title }: { title: any }) => (
  <View className="bg-gray-100 px-4 py-1.5">
    <Text className="font-bold text-gray-600 text-sm">{title}</Text>
  </View>
);

const AlphabetScroll = () => (
  <View className="absolute right-0 top-1/2 -translate-y-1/2 items-center px-1.5 space-y-px">
    <Pressable className="pb-1">
      <Search className="text-gray-500" size={12} />
    </Pressable>
    {ALPHABET.map((letter) => (
      <Pressable key={letter} className="py-0.5">
        <Text className="text-gray-500 font-bold text-[11px]">{letter}</Text>
      </Pressable>
    ))}
  </View>
);

export default function ContactScreen() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="light-content" />

      <View className="flex-1 bg-white">
        <Header />
        <Tabs />
        <StaticOptions />

        <View className="flex-1 relative">
          <SectionList
            sections={mockFriends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FriendRow item={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeader title={title} />
            )}
            ListHeaderComponent={<FriendTabs />}
            stickySectionHeadersEnabled={true}
            className="flex-1 mr-4"
          />

          <AlphabetScroll />
        </View>
      </View>
    </SafeAreaView>
  );
}