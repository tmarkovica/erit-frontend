export interface LoginResponse {
  jwt: string,
  user: {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    admin: boolean
  }
}
