const cloud = require('wx-server-sdk');
cloud.init({
    env: "hongbao-1g1vxdep2e9a4001"
  });
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const {OPENID} = cloud.getWXContext();
    const userInfo=event.userInfo;
    // 在云开发数据库中存储订阅任务
    await db.collection('user').add({
      data: {
        ...userInfo,
        touser: OPENID, // 订阅者的openid
        date:new Date().toLocaleString()
      },
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};