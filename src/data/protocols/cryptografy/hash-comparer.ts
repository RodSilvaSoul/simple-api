export interface HashComparerParams {
  plaintText: string
  digest: string
}

export interface HashComparer {
  compare: (params: HashComparerParams) => Promise<boolean>
}
