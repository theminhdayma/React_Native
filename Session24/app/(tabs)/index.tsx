import React from "react";
import { FlatList, Image, Platform } from "react-native";
import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  InputField,
  Icon,
  Pressable,
  InputSlot,
} from "@gluestack-ui/themed";
import { Search, Plus, Grid, BadgeCheck } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const conversations = [
  {
    id: 1,
    name: "Media Box",
    message: "Zing MP3: [APP] Hãy để KAKA khai...",
    icon: "https://cdn-icons-png.flaticon.com/512/1976/1976426.png",
  },
  {
    id: 2,
    name: "Thời Tiết",
    message: "🌤 Chất lượng không khí Sài Gòn ở...",
    time: "5 giờ",
    icon: "https://cdn-icons-png.flaticon.com/512/7133/7133364.png",
  },
  {
    id: 3,
    name: "Cộng đồng Game Online",
    message: "🎮 Thư Giãn Sảng Khoái Cùng Crazy...",
    time: "T4",
    icon: "https://cdn-icons-png.flaticon.com/512/8193/8193275.png",
  },
  {
    id: 4,
    name: "ZaloPay",
    message: "💰 Bạn có voucher Hóa đơn! Giảm 50K...",
    time: "T2",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png",
  },
  {
    id: 5,
    name: "Zalo Sticker",
    message: "😆 ỦA ĐANG CHƠI DZUI TỰ NHIÊN KHỊA?...",
    time: "T2",
    icon: "https://cdn-icons-png.flaticon.com/512/3900/3900753.png",
  },
];

export default function ChatListScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Box className="flex-1 bg-white">
        <HStack className="bg-[#00ADEF] px-4 py-3 flex-row justify-between space-x-4">
          <Input className="flex-row items-center gap-4">
            <InputSlot>
              <Icon
                as={Search}
                className="text-gray-500 mr-2 w-5 h-5"
                color="#F2E4E4"
              />
            </InputSlot>

            <InputField
              placeholder="Tìm kiếm"
              className="text-base text-black bg-[#00ADEF]"
              placeholderTextColor="#F2E4E4" 
            />
          </Input>

          <HStack className="flex-row gap-4 items-center space-x-5">
            <Pressable>
              <Icon as={Grid} className="text-white w-6 h-6" color="#F2E4E4" />
            </Pressable>
            <Pressable>
              <Icon as={Plus} className="text-white w-6 h-6" color="#F2E4E4" />
            </Pressable>
          </HStack>
        </HStack>

        <Pressable className="flex-row items-center border-b border-gray-200 px-4 py-3 bg-gray-50 active:bg-gray-100">
          <Box className="mr-4 relative">
            <Box className="w-14 h-14 rounded-full bg-blue-200 justify-center items-center">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4144/4144784.png", 
                }}
                className="w-8 h-8" 
                alt="Cloud Icon"
              />
            </Box>
            <Box className="absolute bottom-0 right-0 bg-white rounded-full p-px">
              <Icon as={BadgeCheck} className="text-yellow-500 w-5 h-5" />
            </Box>
          </Box>

          <VStack className="flex-1">
            <HStack className="flex-row justify-between">
              <Text className="font-semibold text-base text-black">
                Cloud của tôi
              </Text>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png", 
                }}
                className="w-4 h-4 text-gray-500"
                alt="Edit Icon"
              />
            </HStack>
            <Text className="text-gray-600 text-sm">
              Cuộc trò chuyện này đang được ghim
            </Text>
          </VStack>
        </Pressable>

        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable className="flex-row items-center border-b border-gray-200 px-4 py-3">
              <Box className="mr-3 rounded-full overflow-hidden bg-gray-100 w-10 h-10 justify-center items-center">
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  resizeMode="cover"
                />
              </Box>

              <VStack className="flex-1">
                <HStack className="flex-row justify-between">
                  <Text className="font-semibold text-base">{item.name}</Text>
                  <Text className="text-gray-500 text-xs">{item.time}</Text>
                </HStack>

                <HStack className="flex-row justify-between mt-1">
                  <Text
                    className="text-gray-600 text-sm flex-1"
                    numberOfLines={1}
                  >
                    {item.message}
                  </Text>
                  <Box className="bg-red-500 rounded-full px-2 ml-2 justify-center items-center">
                    <Text className="text-white text-xs font-bold">N</Text>
                  </Box>
                </HStack>
              </VStack>
            </Pressable>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}