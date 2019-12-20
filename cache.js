const request = require('request');

const cache = {
  data: '',
  getCache: '',
  setCache: '',
  refeshCache: '',
}

//获取缓存数据
cache.getCache = () => {
  return cache.data;
}


//请求接口，给cache.data重新赋值...
var i = 1
cache.setCache = () => {
  request('http://localhost:3000/api/data/test', async function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cache.data = body
      if (i == 1) {
        console.log('================***********==================')
        console.log(`初始化数据，第${i}次调用接口，当前时间：${new Date()}，当前数据：${cache.data}`)
        i++;
      } else {
        console.log('================***********==================')
        console.log(`数据刷新，第${i}次调用接口，当前时间：${new Date()}，当前数据：${cache.data}`)
        i++;

      }

    }
  })
}


//判断是否更新数据
cache.isRefeshCache = () => {
  var currtime = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':');
  console.log(currtime)
  //是否是0点
  if (currtime === '0:0:0') {
  // if (currtime === '0:22:50') {
    cache.setCache()
  }
}

//初始化数据
cache.setCache();

//定时判断是否更新数据
setInterval(() => {
  cache.isRefeshCache()
}, 1000);
module.exports = cache.getCache;