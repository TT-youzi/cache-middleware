const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router') // koa 路由中间件
const router = new Router(); // 实例化路由
app.use(router.routes());
const Cache = require('./cache');
app.use(Cache)

//模拟一个后台数据接口 数据量大 请求慢
router.get('/api/data/test', (ctx, next) => {
  let data = {
    name: 'xxx',
    age: '1223'
  }
  ctx.body = data
});


//前端请求的接口
router.get('/', async (ctx, next) => {
  let currData = Cache()
  ctx.response.body = `<h5>当前数据为：${currData}</h5>`;
});


app.listen(3000);