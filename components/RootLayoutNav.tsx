import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function RootLayoutNav() {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Wait for the component to be fully mounted before attempting navigation
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isNavigationReady) return;

    const inAuthGroup = segments[0] === "login";
    
    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // User is logged in but still in auth group, redirect to appropriate role
      if (user.role === "driver") {
        router.replace("/driver");
      } else if (user.role === "customer") {
        router.replace("/customer");
      } else if (user.role === "admin") {
        router.replace("/admin");
      }
    } else if (user && !inAuthGroup) {
      // User is logged in, check if they're in the right role section
      if (user.role === "driver" && segments[0] !== "driver") {
        router.replace("/driver");
      } else if (user.role === "customer" && segments[0] !== "customer") {
        router.replace("/customer");
      } else if (user.role === "admin" && segments[0] !== "admin") {
        router.replace("/admin");
      }
    }
  }, [user, segments, isNavigationReady]);

  return <Slot />;
}
