const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const {index, users} = require('./app/router.js')

// 错误处理
onerror(app)

// 中间件
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 静态资源
app.use(require('koa-static')('./app/public'))

// 模版引擎
app.use(views('./app/view', {
    extension: 'pug'
}))

// 路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.listen(3000);
