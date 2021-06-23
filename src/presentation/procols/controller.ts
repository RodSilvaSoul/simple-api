import { HttpResonse } from '@presentation/procols'

export interface Controller<T = any> {
    handle(request: T):Promise<HttpResonse>
}
