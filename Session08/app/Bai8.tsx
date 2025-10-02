import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user_data";

export default function Bai8() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const migrateData = async () => {
      try {
        const data = await AsyncStorage.getItem(USER_KEY);

        if (data) {
          const parsed = JSON.parse(data);

          if (parsed.version === 2) {
            setUser(parsed);
            return;
          }

          if (parsed.name) {
            const [firstName, ...rest] = parsed.name.split(" ");
            const lastName = rest.join(" ");

            const newData = {
              user: { firstName, lastName },
              version: 2,
            };

            await AsyncStorage.setItem(USER_KEY, JSON.stringify(newData));
            setUser(newData);
          }
        } else {
          const defaultData = {
            user: { firstName: "Guest", lastName: "" },
            version: 2,
          };
          await AsyncStorage.setItem(USER_KEY, JSON.stringify(defaultData));
          setUser(defaultData);
        }
      } catch (error) {
        console.log("Migration error:", error);
      }
    };

    migrateData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <Text>
          Xin chào {user.user.firstName} {user.user.lastName} (v{user.version})
        </Text>
      ) : (
        <Text>Đang tải dữ liệu...</Text>
      )}
    </View>
  );
}