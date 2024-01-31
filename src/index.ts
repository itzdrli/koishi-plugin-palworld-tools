import { Context, Schema } from 'koishi'

export const name = 'palworld-tools'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

declare module 'koishi' {
  interface Tables {
    palworld_serverlist: Palworld_ServerList
  }
}

// 这里是新增表的接口类型
export interface Palworld_ServerList {
  id: number
  servername: string
  serverip: string
  adddate: Date
}
export function apply(ctx: Context) {

  
  ctx.model.extend('palworld_serverlist', {
    // 各字段的类型声明
    id: 'unsigned',
    servername: 'string',
    serverip: 'string',
    adddate: 'timestamp',
  })

const plugin_id = "d7a4544c-1275-405c-b6c3-32c9164a4319"

ctx.command('/服务器列表')
  return '当前已收录的服务器有：'
}
