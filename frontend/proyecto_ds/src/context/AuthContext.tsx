"use client"

import {createContext, useState, useEffect, useContext, ReactNode} from "react"
import { api } from "../services/api"

// Interfaz para el contexto de autenticación
interface AuthContextType {
  user: { token: string } | null
  loading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

// Se puede inicializar el contexto como null y forzar el tipo luego
const AuthContext = createContext<AuthContextType | undefined>(undefined)

var payload: any // Puedes tiparlo si sabes la estructura exacta del payload

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ token: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      setUser({ token: accessToken })
    }
    setLoading(false)
  }, [])

  const login = async (cedula: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post("/usuario/login/", { cedula, password })
      const { access, refresh } = response.data

      payload = JSON.parse(atob(access.split(".")[1]))
    
      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)
      
      setUser({ token: access })
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (refreshToken) {
        await api.post(
          "/usuario/logout/",
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        )
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Getter para el payload decodificado
export const getPayload = {
  id: (): any => payload,
}
