import type { TitleOrder } from '@mantine/core'

export type User = {
  id: string
  email: string
  role: string
}

export type AuthStoreType = {
  user: User
  loading: boolean
  setLoading: (loading: boolean) => void
  setUser: (user: User) => void
}

export type ElementsType = {
  name: 'name' | 'jobTitle'
  placeholder?: string
  order: TitleOrder
}
