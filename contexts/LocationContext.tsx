import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContainerLocation {
  lat: number;
  lng: number;
  speed: number;
  status: string;
  updatedAt: string;
}

interface LocationContextType {
  location: ContainerLocation | null;
  setLocation: (loc: ContainerLocation) => void;
}

// Tạo context
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Provider bọc toàn bộ app
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<ContainerLocation | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook để dùng trong component con
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation phải dùng bên trong LocationProvider");
  }
  return context;
};
