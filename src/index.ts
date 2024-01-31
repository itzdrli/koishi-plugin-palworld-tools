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
  })

  ctx.command('服务器列表')
  .action(async ({ session }) => {
    const list = await ctx.database.get('palworld_serverlist', [1,2,3,4,5], ['servername', 'serverip']);
    
    let output = '幻兽帕鲁-服务器列表 \n';
    for (const item of list) {
      output += `名称: ${item.servername} | IP: ${item.serverip}\n`;
    }
    output += '\n没有收录你的服务器？请发送服务器收录 名称 IP。';

    session.send(output);
  })
  var newid = 0
ctx.command('服务器收录 <name> <ip>')
  .action(async ({ session },name,ip) => {

    newid = newid+1
      // 向 servers 表中添加一行数据
      await ctx.database.create('palworld_serverlist', {
        id: newid,
        servername: name,
        serverip: ip,
      });

      session.send(`已成功收录服务器：${name} - ${ip}`);
    }
  )};
