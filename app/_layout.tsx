import { AuthProvider } from "../contexts/AuthContext";
import RootLayoutNav from "../components/RootLayoutNav";
import { LocationProvider } from "@/contexts/LocationContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <LocationProvider>
      <RootLayoutNav />
      </LocationProvider>
    </AuthProvider>
  );
}
