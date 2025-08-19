import { LoginRequest } from "@/interfaces/Auth"
import { User } from "@/interfaces/User"
import { marketAPI, setAccessToken } from "@/services/api"
import { login } from "@/services/authService"
import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await marketAPI.get("/auth/getLoggedUser")
            setUser(data.user)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const signIn = async (params: LoginRequest) => {
        const { accessToken, message } = await login(params)
        setAccessToken(accessToken) // store access token in memory
        await fetchUser()
        return message
    }

    const logout = async () => {
        await marketAPI.post("/auth/logout")
        setAccessToken(null)
        setUser(null)
    }

    return { user, loading, signIn, logout }
}