module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins:[
    ['module-resolver',{
      alias: {
        '@main': './src/main',
        '@domain': './src/domain',
        '@infra': './src/infra',
        '@presentation' :'./src/presentation',
        '@data': './src/data',
        '@validation': './src/validation'
      }
    }]
  ],
  ignore: ["./src/tests"]
}
