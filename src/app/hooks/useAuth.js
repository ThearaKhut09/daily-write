import { useEffect, useState, useCallback } from "react";
import { clearTokens, isTokenExpired, getDecryptedAccessToken, getDecryptedRefreshToken } from "../../util/tokenUtil";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { AES, enc } from "crypto-js";

const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPTED_KEY || "fallback-key-change-this";

// Helper to get decrypted user
const getStoredUser = () => {
  try {
    const encryptedUser = secureLocalStorage.getItem("user");
    if (!encryptedUser) return null;

    const decrypted = AES.decrypt(encryptedUser, ENCRYPT_KEY);
    const userStr = decrypted.toString(enc.Utf8);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error loading user:", error);
    return null;
  }
};

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = getDecryptedAccessToken();
      const expired = isTokenExpired();
      const storedUser = getStoredUser();

      setUser(storedUser);

      if (token && !expired) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (expired) {
          const refreshToken = getDecryptedRefreshToken();
          if (!refreshToken) {
            clearTokens();
          }
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    secureLocalStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/auth");
  }, [navigate]);

  return {
    isAuthenticated,
    isLoading,
    user,
    logout,
  };
};

export default useAuth;
