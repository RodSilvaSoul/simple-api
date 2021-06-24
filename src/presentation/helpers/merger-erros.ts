export const mergerErros = (erros: Error[]): string[] => {
  const relatorio = erros.filter(error => error !== null).map(error => error.message)
  return relatorio
}
