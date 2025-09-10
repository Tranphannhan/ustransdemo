import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trang chính Khách hàng" }} />
      <Stack.Screen name="booking" options={{ title: "Đặt container" }} />
      <Stack.Screen name="map" options={{ title: "Lộ trình" }} />
    </Stack>
  );
}
