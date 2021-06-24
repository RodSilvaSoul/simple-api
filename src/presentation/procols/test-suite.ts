export interface TestSuite{
    start(input:Record<string, any>): Error[] | null
}
