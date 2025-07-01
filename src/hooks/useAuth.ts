import { useState, useEffect, createContext, useContext } from "react";
import { AuthService } from "@/services/authService";
import { User } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ data: any; error: any }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    userType?: "owner" | "admin" | "agent",
  ) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur actuel au chargement
    const getCurrentUser = async () => {
      const { user } = await AuthService.getCurrentUser();
      setUser(user);
      setLoading(false);
    };

    getCurrentUser();

    // Écouter les changements d'authentification
    const { data: authListener } = AuthService.onAuthStateChange(
      async (authUser) => {
        if (authUser) {
          const { user } = await AuthService.getCurrentUser();
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await AuthService.signIn(email, password);
    setLoading(false);
    return result;
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    userType: "owner" | "admin" | "agent" = "owner",
  ) => {
    setLoading(true);
    const result = await AuthService.signUp(
      email,
      password,
      fullName,
      userType,
    );
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await AuthService.signOut();
    setUser(null);
    setLoading(false);
    return result;
  };

  const resetPassword = async (email: string) => {
    return await AuthService.resetPassword(email);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};

export { AuthContext };
