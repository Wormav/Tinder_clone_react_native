import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../database/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loadingInitial, setloadingInitial] = useState(true);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setloadingInitial(false);
      setloading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth).then(() => setUser(null));
  };

  const memoedValue = useMemo(() => {
    return { user, setUser, loading, setloading, logout };
  }, [user, loading]);

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
