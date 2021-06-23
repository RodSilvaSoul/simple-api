export class InvalidParamError extends Error {
  constructor (fildName:string) {
    super(`invalid param: ${fildName}`)
    this.name = 'InvalidParamError'
  }
}
