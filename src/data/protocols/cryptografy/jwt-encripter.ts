export interface JwtEncripterParams {
  email: string
  payload: Record<string, unknown>
}

export interface JwtEncripterResult {
  accesToken: string
  refreshToken: string
}

export interface JwtEncripter {
  encript: (params: JwtEncripterParams) => Promise<JwtEncripterResult>
}
