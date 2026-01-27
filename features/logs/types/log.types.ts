export type clientProps = {
  id: string | number
  nome: string
  sobrenome: string
}

export interface ILog {
  id: number
  clientId: number
  action: string
  module: string
  createdAt: string
  client: clientProps
}
