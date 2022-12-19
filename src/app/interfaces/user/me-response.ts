export interface MeResponse {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
  admin: boolean,
  role: {
    id: number,
    name: string,
    description: string,
    type: string,
    createdAt: string,
    updatedAt: string
  }
}
