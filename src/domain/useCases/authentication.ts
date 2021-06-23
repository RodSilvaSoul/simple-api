export interface AuthenticationParams {
  email: string
  password: string
}

export interface AuthenticationResult {
  accesToken: string
  refreshToken: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AuthenticationResult>
}
