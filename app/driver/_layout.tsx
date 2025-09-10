import { Stack } from "expo-router";

export default function DriverLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trang chính Tài xế" }} />
      <Stack.Screen name="orders" options={{ title: "Đơn hàng" }} />
    </Stack>
  );
}
