"use client"

import { LoginRequest } from "@/interfaces/Auth";
import { User } from "@/interfaces/User";
import { marketAPI } from "@/lib/api";
import { authAPI, getAccessToken, refreshAccessToken, setAccessToken } from "@/lib/tokenManager";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (params: LoginRequest) => Promise<string | undefined>
  logout: () => Promise<void>
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations();
  
  // Fetch current user from your API (expects Authorization header)
  const fetchUser = useCallback(async () => {
    const { data } = await marketAPI.get("/auth/getLoggedUser"); // -> /api/auth/getLoggedUser
    
    setUser(data.user ?? null);
  }, []);

  // On mount: try silent refresh if no access token, then fetch user.
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        // If no access token in memory, attempt silent refresh (cookie-based)
        if (!getAccessToken()) {
          try {
            const newToken = await refreshAccessToken(); // uses authAPI (withCredentials)
            setAccessToken(newToken);                    // store in-memory
          } catch {
            setUser(null);
            // refresh failed (no/invalid cookie) — user remains unauthenticated
          }
        }

        // If we have a token now, resolve the user
        if (getAccessToken()) {
          await fetchUser();
        } else {
          setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [fetchUser]);

  // Explicit login using the auth API
  const signIn = async (params: LoginRequest) => {
    try {
    const { data } = await authAPI.post("/login", params); // cookie set by server
    setAccessToken(data.accessToken);                       // store the access token
    await fetchUser();
    return data.message as string | undefined;
  } catch (error: any) {
    throw new Error(t(error.response?.data?.error) || t("loginFailed"));
  }};

  // Logout: clear server cookie (if route exists) and local state
  const logout = async () => {
    try {
      await authAPI.post("/logout"); // implement on BE to clear refresh cookie
    } catch {
      // ignore network/logout route failures; we'll still clear client state
    } finally {
      setAccessToken(null);
      setUser(null);
      router.push('/login')
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout, refresh: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};