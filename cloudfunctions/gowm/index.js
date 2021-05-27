// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios');
const request = require('request');
cloud.init({
  env: "hongbao-1g1vxdep2e9a4001"
});
cloud.init()
const userAgent =
  'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36';
async function getDate(url, type) {
  const option = {
    url,
    method: 'get',
    headers: {
      'user-agent': userAgent,
    },
  };
  if (type) {
    option.responseType = type;
  }
  return axios(option);
}
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {OPENID} = cloud.getWXContext();
    const url=event.url;
    // 在云开发数据库中存储订阅任务
    let watermark = await new Promise(async resolve => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let href = response.request.href;
          console.log(href)
          let id;
          try {
            id = href.match(/video\/(\S*)\/\?region/)[1];
          } catch (error) {
            // res.json(send)
            console.log(22, error)
          }
          resolve(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`);
        } else {
          console.log(err)
        }
      })
    });
    return await new Promise(async resolve => {
      request(watermark, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let result = JSON.parse(body);
          let data = result.item_list[0];
          //视频url解析
          const remp = data['video']["play_addr"]["url_list"][0];
          const url = remp.replace(/wm/g, '');
          const { data: videoStream } = await getDate(url, 'stream');
          resolve({ videoStream })
        } else {

        }
      })
    });
  } catch (err) {
    console.log(err);
    return false;
  }
}