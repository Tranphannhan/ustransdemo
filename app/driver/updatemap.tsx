"use client";
import { useLocation } from "@/contexts/LocationContext";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function DriveScreen() {
  const { setLocation } = useLocation();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        async (location) => {
          const { latitude, longitude, speed } = location.coords;

          try {
            const newLocation = {
              lat: latitude,
              lng: longitude,
              speed: speed ?? 0,
              status: "moving",
              updatedAt: new Date().toISOString(),
            };

            setLocation(newLocation);
            console.log("📍 Vị trí đã cập nhật:", latitude, longitude);
          } catch (error) {
            console.error("❌ Lỗi gửi dữ liệu:", error);
          }
        }
      );
    })();
  }, []);

const handleBack = () => {
  // Trang index thường không có "trang trước" nên về thẳng login
  router.replace("/login");
};


  return (
    <View style={{ flex: 1 }}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>⬅️ Quay lại</Text>
      </TouchableOpacity>

      {/* Nội dung chính */}
      <View style={styles.container}>
        <Text>🚚 Đang theo dõi vị trí tài xế...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50, // đẩy xuống để không đè status bar
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    zIndex: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


//code cũ

// export default function DriveScreen() {
//   const { location, setLocation } = useLocation();

//   useEffect(() => {
//     (async () => {
//       // Yêu cầu quyền truy cập vị trí
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission denied");
//         return;
//       }

//       // Theo dõi vị trí tài xế
//       await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 5000, // 5s cập nhật
//           distanceInterval: 5, // hoặc sau 5m
//         },
//         async (location) => {
//           const { latitude, longitude, speed } = location.coords;

//           try {
//             await fetch("http://localhost:3000/update-location", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 containerId: "container-123", // ID container bạn gán
//                 lat: latitude,
//                 lng: longitude,
//                 speed: speed ?? 0,
//               }),
//             });
//             console.log("📍 Vị trí đã cập nhật:", latitude, longitude);
//           } catch (error) {
//             console.error("❌ Lỗi gửi dữ liệu:", error);
//           }
//         }
//       );
//     })();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>🚚 Đang theo dõi vị trí tài xế...</Text>
//     </View>
//   );
// }
