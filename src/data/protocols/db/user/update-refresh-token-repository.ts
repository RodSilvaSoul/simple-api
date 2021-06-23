export interface UpdateRefreshTokenParams {
  id: string
  refreshToken: string
}

export interface UpdateRefreshtokenRepository {
  updateRefashtoken: (params: UpdateRefreshTokenParams) => Promise<void>
}
