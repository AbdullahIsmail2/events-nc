import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if admin is logged in from localStorage
  useEffect(() => {
    const storedAdminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(storedAdminStatus === "true");
  }, []);

  // Function to log in admin
  const loginAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true"); // Persist login
  };

  // Function to log out admin
  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin"); // Remove from storage
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Hook to use the context
export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
