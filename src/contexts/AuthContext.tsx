
import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { mockUsers } from "../services/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, we would validate credentials with a backend
    const user = mockUsers.find(user => user.email === email);
    
    if (user) {
      setCurrentUser(user);
      // Store user in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Invalid email or password.",
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    // Remove user from localStorage
    localStorage.removeItem('currentUser');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, we would create a new user in the database
    
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Email already in use.",
      });
      return false;
    }
    
    // Create new user with proper ID
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      role: "citizen",
    };
    
    // Set as current user
    setCurrentUser(newUser);
    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created and you are now logged in.",
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
