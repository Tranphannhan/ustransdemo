import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth, UserRole } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const success = await login(phone.trim(), password.trim(), selectedRole);
    if (!success) {
      Alert.alert('Lỗi', 'Số điện thoại hoặc mật khẩu không đúng');
    }
  };

  const roles: { key: UserRole; label: string; emoji: string }[] = [
    { key: 'admin', label: 'Quản trị viên', emoji: '👨‍💼' },
    { key: 'customer', label: 'Khách hàng', emoji: '👤' },
    { key: 'driver', label: 'Tài xế', emoji: '👨‍✈️' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Text style={styles.roleLabel}>Chọn quyền:</Text>
        <View style={styles.roleContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.key}
              style={[
                styles.roleButton,
                selectedRole === role.key && styles.roleButtonSelected
              ]}
              onPress={() => setSelectedRole(role.key)}
            >
              <Text style={styles.roleEmoji}>{role.emoji}</Text>
              <Text style={[
                styles.roleText,
                selectedRole === role.key && styles.roleTextSelected
              ]}>
                {role.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.demoText}>
          Demo: SĐT: 1234567890, Mật khẩu: 000000
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  roleButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  roleEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  roleText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  roleTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  demoText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
