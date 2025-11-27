// src/context/AuthContext.jsx
import { useEffect, createContext, useContext, useState } from "react";
import {
  signupRequest,
  signinRequest,
} from "@/api/requests/auth.js";

const AuthContext = createContext();
const LOCAL_USER_KEY = "me-app-user";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Clear error messages after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (userData) => {
    try {
      const res = await signupRequest(userData);
      console.log(res.data);
      if (res.status === 201 || res.status === 200) {
        setUser(res.data);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
        localStorage.setItem("register", "true");
        setIsAuthenticated(true);
        console.log("User registered:", res.data);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setErrors([msg]);
      console.log("Registration error:", err);
      throw new Error(msg);
    }
  };

  const signin = async (userData) => {
    try {
      const res = await signinRequest(userData);
      if (res.status === 200) {
        setUser(res.data.user);
        console.log(res.data)
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        console.log("User logged in:", res.data.user);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setErrors([msg]);
      console.log("Login error:", err);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
        console.log("Logging out user:", user);
    } catch {
      console.log("Error during logout");
    } finally {
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
