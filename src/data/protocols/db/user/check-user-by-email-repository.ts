export interface CheckUserByEmailRepository {
  checkUserByEmail(email: string): Promise<boolean>
}
