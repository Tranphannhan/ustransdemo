import { AuthProvider } from "../contexts/AuthContext";
import RootLayoutNav from "../components/RootLayoutNav";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
