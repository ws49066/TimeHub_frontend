export type IRoom = {
  id?: number
  room: string
  start_time: string
  end_time: string
  hour_block: number
}


export type IRoomList = {
  rooms: IRoom[]
}