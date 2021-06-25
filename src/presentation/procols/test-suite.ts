export interface TestSuite{
    start(input:Record<string, any>): Promise<Error[] | null>
}
