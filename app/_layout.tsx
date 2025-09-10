import { AuthProvider } from "../contexts/AuthContext";
import RootLayoutNav from "../components/RootLayoutNav";
<<<<<<< HEAD
import { LocationProvider } from "@/contexts/LocationContext";
=======
>>>>>>> 7425e83728c78d227f3c4663064fa74322e3b3b3

export default function RootLayout() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <LocationProvider>
      <RootLayoutNav />
      </LocationProvider>
=======
      <RootLayoutNav />
>>>>>>> 7425e83728c78d227f3c4663064fa74322e3b3b3
    </AuthProvider>
  );
}
