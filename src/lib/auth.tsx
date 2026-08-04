import { createContext, useContext, useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const signIn = (email: string, _password: string) => {
    const user: User = { name: email.split("@")[0], email };
    setUser(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const signUp = (name: string, email: string, _password: string) => {
    const user: User = { name, email };
    setUser(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}