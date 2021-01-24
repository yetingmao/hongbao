const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const {
      OPENID
    } = cloud.getWXContext();
    // 在云开发数据库中存储订阅任务
    const messages = await db
      .collection('messages')
      // 查询条件这里做了简化，只查找了状态为未发送的消息
      .where({
        touser: OPENID,
      })
      .get();
    return messages.data.length > 0 ? true : false;
  } catch (err) {
    console.log(err);
    return err;
  }
};