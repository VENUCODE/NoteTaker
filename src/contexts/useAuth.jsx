import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import hostUrl, { endpoints } from "../endpoints";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const login = async (credentials, setLoading, callback) => {
    try {
      setLoading(true);
      const response = await fetch(hostUrl + endpoints.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      setToken(data.token);
      setIsAuthenticated(true);
      setUser(data.user); // Keep as object

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Fixed

      message.success("Login success");
      callback();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const register = async (userData, setLoading, callback) => {
    try {
      setLoading(true);
      const response = await fetch(hostUrl + endpoints.register, {
        method: "POST",
        body: userData,
      });

      if (!response.ok) {
        throw new Error("Failed to register!");
      }

      message.success("Registration success");
      callback();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const invalidate = useCallback(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        const decodedToken = jwtDecode(storedToken);
        const tokenExpiration = decodedToken.exp;
        const currentTime = new Date().getTime() / 1000;

        if (tokenExpiration < currentTime) {
          logout();
        } else {
          setToken(storedToken);
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    invalidate();
    setLoading(false); // Ensure this is only set after `invalidate()`
  }, [invalidate]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        loading,
        isAuthenticated,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
