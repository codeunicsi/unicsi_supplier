import { createContext, useContext } from "react";
import { isAuthenticated, getUserRole, logout, login } from "../utils/auth";

const AuthContext = createContext();

// Custom hook to use auth context with error handling
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            getUserRole,
            logout,
            login
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };