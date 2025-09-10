import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Dashboard Admin" }} />
      <Stack.Screen name="users" options={{ title: "Quản lý Người dùng" }} />
    </Stack>
  );
}
