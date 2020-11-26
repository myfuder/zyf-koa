
// const Koa = require("koa")
// const cors = require("koa2-cors")
// const app = new Koa()
// const json = require("koa-json")
// const onerror = require("koa-onerror")
// const bodyparser = require("koa-bodyparser")
// const logger = require("koa-logger")
//
// const dev.js = require("./routes")
import "babel-register"
import Koa from 'koa'
const app = new Koa()
import cors from 'koa2-cors'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import statickoa from 'koa-static'
import logger from 'koa-logger'
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(cors());
app.use(statickoa(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
export {app}
