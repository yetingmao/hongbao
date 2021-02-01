// miniprogram/pages/index/index.js
import Toast from '../../components/dist/toast/toast';
import { subscribe, hasSubscribe} from "../../utils/index"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    this.getTabBar().init();
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.addUser()
  },
  addUser() {
    wx.cloud.callFunction({
      name: 'addUser',
      data: {
        userInfo: app.globalData.userInfo
      },
    })
  },
  collect() {
    Toast.success('点击右上角添加收藏～');
  },
  requestSubscribe() {
    if (!app.globalData.userInfo) {
      Toast.fail('请先登录');
      return
    }
    hasSubscribe(res=>{
      if(res.result){
        Toast.success('已经订阅成功了');
      }else{
        subscribe(res=>{
          if (res.result === true) {
            Toast.success('订阅成功');
          } else {
            Toast.fail('订阅失败');
          }
      });
      }
    })
    //申请发送订阅消息
  },
})