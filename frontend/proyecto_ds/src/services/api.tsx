import axios, { AxiosRequestConfig, AxiosError } from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          window.location.href = "/login"
          return Promise.reject(error)
        }

        // Token refresh logic would go here
        window.location.href = "/login"
        return Promise.reject(error)
      } catch (refreshError) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export interface User {
  id?: number
  // Añade aquí más campos según tu modelo de usuario
  [key: string]: any
}

export const userService = {
  getAll: () => api.get<User[]>("/usuario/create/"),
  getById: (id: number | string) => api.get<User>(`/usuario/create/${id}/`),
  create: (data: User) => api.post("/usuario/create/", data),
  update: (id: number | string, data: Partial<User>) => api.put(`/usuario/create/${id}/`, data),
  partialUpdate: (id: number | string, data: Partial<User>) => api.patch(`/usuario/create/${id}/`, data),
  delete: (id: number | string) => api.delete(`/usuario/create/${id}/`),
}
