// miniprogram/pages/index/index.js
import {
    subscribe,
    hasSubscribe
} from "../../utils/index"
import Toast from '../../components/dist/toast/toast';
const db = wx.cloud.database()
const app = getApp()
Page({
    /**
     * 页面的初始数据 https://mp.weixin.qq.com/s/jTIpMGmNLs4qifpLBxqRfw
     */
    data: {
        data: [],
        show: false,
        src: "",
        name:"",
        loading: false,
        list: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList()
    },
    showAdd(e) {
        if (!app.globalData.userInfo) {
            wx.switchTab({
                url: "/pages/user/index",
                complete: () => {
                    Toast.fail('请先登录');
                }
            });
            return
        }
        this.setData({
            show: true,
        });
    },
    onClose() {
        this.setData({
            show: false
        });
    },
    changeSrc(e) {
        this.setData({
            src: e.detail
        });
    },
    changeName(e) {
        this.setData({
            name: e.detail
        });
    },
    add() {
        this.setData({
            loading: true,
          })
        wx.cloud.callFunction({
            name: 'article_add',
            data: {
                info: {
                    username: app.globalData.userInfo.nickName,
                    src: this.data.src,
                    name:this.data.name,
                }
            },
            success:()=>{
                this.setData({
                    loading: false,
                  })
                 this.getList()
            }
        })
    },
    getList() {
        db.collection('article').get().then(res => {
            const data=res.data.map((item)=>{
               return {
                name:item.name,
                src:item.src,
                label:`作者：${item.username}-----上传时间：${new Date(item.date).toLocaleString()}-----阅读数：${item.number}`,
               }  
            });
            console.log(data)
            this.setData({
                list:data
            })
        })
    },
    jump(e) {
        const couponIdx = e.currentTarget.dataset.index
        const wxappinfo = this.data.tabs[this.data.activeTab].coupon[couponIdx].minapp

        wx.navigateToMiniProgram({
            appId: wxappinfo.appid,
            path: wxappinfo.path,
            success(res) {
                // 打开成功
                console.log('打开成功', res)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().init();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: this.data.msg.title,
            path: this.data.msg.path,
            imageUrl: this.data.msg.imageUrl,
        }
    }
})