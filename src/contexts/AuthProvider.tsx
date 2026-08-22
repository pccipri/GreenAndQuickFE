"use client"

import { LoginRequest } from "@/interfaces/Auth";
import { User } from "@/interfaces/User";
import { authAPI, getAccessToken, refreshAccessToken, setAccessToken } from "@/lib/tokenManager";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (params: LoginRequest) => Promise<string | undefined>
  logout: () => Promise<void>
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations("auth");

  const clearAuthState = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  // Resolve current user using the RESTful profile endpoint.
  const fetchUser = useCallback(async () => {
    const { data } = await authAPI.get("/users/me");
    const resolvedUser = data?.user ?? data ?? null;
    setUser(resolvedUser);
  }, []);

  const refresh = useCallback(async () => {
    try {
      await fetchUser();
    } catch {
      clearAuthState();
      throw new Error(t("sessionExpired"));
    }
  }, [clearAuthState, fetchUser, t]);

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
            clearAuthState();
            // refresh failed (no/invalid cookie) — user remains unauthenticated
          }
        }

        // If we have a token now, resolve the user
        if (getAccessToken()) {
          try {
            await fetchUser();
          } catch {
            clearAuthState();
          }
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
  }, [clearAuthState, fetchUser]);

  // Explicit login using the auth API
  const signIn = async (params: LoginRequest) => {
    try {
      const { data } = await authAPI.post("/login", params);
      setAccessToken(data.accessToken);
      await fetchUser();

      return data.message as string | undefined;
    } catch (error: any) {
      clearAuthState();

      const errorKey = error.response?.data?.error;

      if (errorKey) {
        const translationKey = errorKey.replace(/^auth\./, '');
        throw new Error(t(translationKey));
      }

      throw new Error(t("loginFailed"));
    }
  };

  // Logout: clear server cookie (if route exists) and local state
  const logout = async () => {
    try {
      await authAPI.post("/logout"); // implement on BE to clear refresh cookie
    } catch {
      // ignore network/logout route failures; we'll still clear client state
    } finally {
      clearAuthState();
      router.push('/login')
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, signIn, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};