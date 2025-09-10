import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trang chính Khách hàng" }} />
      <Stack.Screen name="booking" options={{ title: "Đặt container" }} />
<<<<<<< HEAD
      <Stack.Screen name="map" options={{ title: "Lộ trình" }} />
=======
>>>>>>> 7425e83728c78d227f3c4663064fa74322e3b3b3
    </Stack>
  );
}
