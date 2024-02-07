import React, { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const value = {
    isLogin,
    user,
    setUser,
    setIsLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
