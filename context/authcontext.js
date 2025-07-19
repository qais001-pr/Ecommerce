/* eslint-disable quotes */
import React, { useState, useContext, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null represents unauthenticated state

    const loginUser = (userData) => setUser(userData);
    const logout = () => setUser(null);
    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider value={{
            user,
            loginUser,
            logout,
            isAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
