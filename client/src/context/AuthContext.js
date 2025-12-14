import { createContext, useContext, useEffect, useState } from "react";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const signin = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Signin failed");
  }

  const data = await res.json();
  setUser(data.user);
};


  const signout = async () => {
    await fetch(`${API_BASE_URL}/auth/signout`, {
      method: "GET",
      credentials: "include",
    });

    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
