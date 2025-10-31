import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";

import {
  Search,
  Grid,
  ShoppingBag,
  Car,
  Smile,
  Landmark,
  Wallet,
  Smartphone,
  Receipt,
  FileText,
  PiggyBank,
  AppWindow,
  Flame,
  ChevronRight,
  MapPin,
  ShoppingBasket,
  Apple,
  Award,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const utilitiesData = [
  { id: "1", name: "Shop", icon: ShoppingBag, color: "text-red-500" },
  { id: "2", name: "Home & Car", icon: Car, color: "text-blue-500" },
  { id: "3", name: "Sticker", icon: Smile, color: "text-purple-500" },
  { id: "4", name: "eGovernment", icon: Landmark, color: "text-blue-800" },
  { id: "5", name: "Ví ZaloPay", icon: Wallet, color: "text-blue-400" },
  { id: "6", name: "Nạp tiền ĐT", icon: Smartphone, color: "text-green-500" },
  { id: "7", name: "Trả Hóa Đơn", icon: Receipt, color: "text-yellow-500" },
  { id: "8", name: "Fiza", icon: FileText, color: "text-gray-500" },
  { id: "9", name: "Tích lũy", icon: PiggyBank, color: "text-green-400" },
  { id: "10", name: "Mini Apps", icon: AppWindow, color: "text-gray-500" },
];

const foodCategories = [
  { id: "1", name: "Gần bạn", icon: MapPin },
  { id: "2", name: "Thực phẩm", icon: ShoppingBasket },
  { id: "3", name: "Đồ ăn vặt", icon: Apple },
  { id: "4", name: "Đặc sản", icon: Award },
];

const Header = () => (
  <View className="flex-row items-center bg-[#00ADEF] px-4 py-3 space-x-4">
    <Pressable className="flex-1 flex-row gap-3 items-center space-x-2">
      <Search className="text-white/70" size={20} color={"#F2E4E4"} />
      <Text className="text-white/70 text-base">Tìm kiếm</Text>
    </Pressable>
    <Pressable>
      <Grid className="text-white" size={24} color={"#F2E4E4"} />
    </Pressable>
  </View>
);

const UtilityItem = ({ item }: { item: any }) => (
  <Pressable className="w-1/4 items-center justify-center p-2 space-y-2">
    <View className="w-12 h-12 rounded-2xl bg-gray-100 justify-center items-center">
      <item.icon className={item.color} size={28} />
    </View>
    <Text className="text-xs text-center" numberOfLines={2}>
      {item.name}
    </Text>
  </Pressable>
);

const UtilitiesGrid = () => (
  <View className="bg-white pt-4 pb-2 mb-3">
    <Text className="font-semibold text-base px-4 mb-2">Tiện ích cho bạn</Text>

    <FlatList
      data={utilitiesData}
      renderItem={({ item }) => <UtilityItem item={item} />}
      keyExtractor={(item) => item.id}
      numColumns={4}
      scrollEnabled={false}
    />
  </View>
);

const LotteryCard = () => (
  <View className="bg-white p-4 mx-4 rounded-2xl shadow shadow-black/10 mb-3">
    <View className="flex-row items-center mb-3">
      <Text className="font-bold text-red-500 text-sm">🔴 Dò vé số</Text>
      <Text className="text-gray-500 text-sm ml-2">. Miền Nam</Text>
    </View>

    <View className="bg-orange-50 rounded-xl p-4">
      <Pressable className="flex-row items-center border-b border-gray-200 pb-3 mb-3">
        <Flame className="text-red-500" size={18} />
        <Text className="font-bold text-red-500 ml-1.5 flex-1">
          Xem chi tiết kết quả hôm nay
        </Text>
        <ChevronRight className="text-red-500" size={16} />
      </Pressable>

      <View className="space-y-2 mb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-medium">Đà Lạt</Text>
          <Text className="text-xl font-bold text-red-500">440765</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-medium">Tiền Giang</Text>
          <Text className="text-xl font-bold text-red-500">864379</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-medium">Kiên Giang</Text>
          <Text className="text-xl font-bold text-red-500">556519</Text>
        </View>
      </View>

      <Pressable className="flex-row items-center justify-between bg-yellow-200 rounded-lg p-3">
        <Text className="font-semibold text-yellow-900">
          Dò kết quả xổ số hằng ngày
        </Text>
        <Text className="font-bold text-yellow-900">Dò ngay {">"}</Text>
      </Pressable>
    </View>
  </View>
);

const FoodCard = () => (
  <View className="bg-white p-4 mx-4 rounded-2xl shadow shadow-black/10 mb-3">
    <Text className="font-semibold text-base mb-3">
      Món ngon gần bạn trên Zalo Connect
    </Text>
    <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2.5 space-x-2 mb-4">
      <Search className="text-gray-500" size={20} />
      <TextInput
        placeholder="Mật ong"
        className="flex-1 p-0 m-0 text-base"
        placeholderTextColor="#6B7280"
      />
    </View>
    <View className="flex-row justify-around">
      {foodCategories.map((item) => (
        <Pressable key={item.id} className="items-center space-y-1.5">
          <View className="w-12 h-12 bg-gray-100 rounded-full justify-center items-center">
            <item.icon className="text-gray-600" size={24} />
          </View>
          <Text className="text-xs font-medium">{item.name}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

export default function DiscoveryScreen() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="light-content" />
      <Header />

      <ScrollView className="flex-1 bg-gray-100">
        <UtilitiesGrid />
        <LotteryCard />
        <FoodCard />
      </ScrollView>
    </SafeAreaView>
  );
}
