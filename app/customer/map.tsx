import MapContainer from "@/components/GoogleMap";
import { useLocation } from "@/contexts/LocationContext";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface ContainerLocation {
  lat: number;
  lng: number;
  speed: number;
  status: string;
  updatedAt: string;
}

export default function BookingScreen() {
   const { location, setLocation } = useLocation();
  useEffect(() => {
      console.log('tọa độ',location)
  }, [location]); 

  if (!location) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapContainer
        currentLocation={[106.6136, 10.8523]}// ví dụ cố định điểm đến
        destination={[location.lng, location.lat]} 
        speed={location.speed}
        status={location.status}
        updatedAt={location.updatedAt}
      />
    </View>
  );
}



//code cũ

// export default function BookingScreen() {
//    const { location, setLocation } = useLocation();
//   const [location, setLocation] = useState<ContainerLocation | null>(null);
//   const containerId = "container-123"; // id container cần theo dõi

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/location/${containerId}`);
//         const data = await res.json();
//         if (data.location) {
//           setLocation(data.location);
//         }
//       } catch (err) {
//         console.error("❌ Lỗi lấy location:", err);
//       }
//     };

//     // Gọi API lần đầu
//     fetchLocation();

//     // Cập nhật mỗi 5s
//     const interval = setInterval(fetchLocation, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (!location) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <MapContainer
//         currentLocation={[location.lng, location.lat]}
//         destination={[106.6136, 10.8523]} // ví dụ cố định điểm đến
//         speed={location.speed}
//         status={location.status}
//         updatedAt={location.updatedAt}
//       />
//     </View>
//   );
// }
