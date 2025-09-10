import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

<<<<<<< HEAD
export default function CustomerHome() {
=======
export default function DriverHome() {
>>>>>>> 7425e83728c78d227f3c4663064fa74322e3b3b3
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Đăng xuất", style: "destructive", onPress: logout }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
<<<<<<< HEAD
        <Text style={styles.title}>Xin chào Khách hàng 👤</Text>
=======
        <Text style={styles.title}>Xin chào Tài xế 👨‍✈️</Text>
>>>>>>> 7425e83728c78d227f3c4663064fa74322e3b3b3
        <Text style={styles.subtitle}>SĐT: {user?.phone}</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push("/driver/orders")}
        >
<<<<<<< HEAD
          <Text style={styles.buttonText}>Đơn</Text>
        </TouchableOpacity>

         <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push("/driver/updatemap")}
        >
          <Text style={styles.buttonText}>Cập nhật map</Text>
=======
          <Text style={styles.buttonText}>Xem đơn hàng</Text>
>>>>>>> 7425e83728c78d227f3c4663064fa74322e3b3b3
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#fff',
  },
});
