import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const val = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
  );
};
