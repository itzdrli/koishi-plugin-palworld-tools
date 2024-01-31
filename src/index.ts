import { Context, Schema,h } from 'koishi'

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

ctx.command('服务器列表')  .action(({ session }) => {
  var list = ctx.database.get('palworld_serverlist', [1], ['servername', 'serverip'])
  session.send('幻兽帕鲁-服务器列表 \n' + String(list) + ' \n收录你的服务器？请发送服务器收录')
})

}
