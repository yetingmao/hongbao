// miniprogram/pages/index/index.js
const db = wx.cloud.database()
const lessonTmplId = "WsI7r1v9d1hdKcWqT9cLmktb8CHGI8Rnfy4d6QlpGoc";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [],
        msg: {},
        activeTab: 0,
        notice: '领完券记得要收藏哦, 以便下次再领',
        isSubscribe:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        db.collection('coupons').get().then(res => {
            const tabs = res.data;
            let all = {
                title: '全部',
                icon: '../../images/all.png',
                coupon: []
            }
            tabs.forEach(item => {
                let c = item.coupon
                c.forEach(citem => {
                    all.coupon.push(citem)
                })
            })
           // tabs.unshift(all)
            this.setData({
                tabs
            })
        })
        db.collection('share-message').get().then(res => {
            const messages = res.data

            let idx = Math.floor(Math.random() * messages.length)

            this.data.msg = messages[idx]
        })

        db.collection('notice').get().then(res => {
            const notice = res.data
            if (notice[0]) this.setData({
                notice: notice[0].notice
            })
        })
        this.hasSubscribe()
    },
    hasSubscribe() {
        wx.cloud.callFunction({
            name: 'getSubscribeNumber',
            complete: res => {
                this.setData({
                    isSubscribe:res.result
                });
            }
        });
    },

    onChange(e) {
        const index = e.detail.index
        this.setData({
            activeTab: parseInt(index)
        })
    },

    toCoupon(e) {
        if(this.data.isSubscribe){
            this.jump(e)

        }else{
            this.onSubscribe(() => {
                this.jump(e)
            });
        }

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
    onSubscribe(fn) {
        //申请发送订阅消息
        wx.requestSubscribeMessage({
            // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
            tmplIds: [lessonTmplId],
            complete:res=> {
                // 申请订阅成功
                if (res.errMsg === 'requestSubscribeMessage:ok') {
                    // 这里将订阅的课程信息调用云函数存入云开发数据
                    wx.cloud
                        .callFunction({
                            name: 'subscribe',
                            data: {
                                templateId: lessonTmplId,
                                data:{
                                    thing1:{
                                        value:"外卖红包"
                                    },
                                    thing3:{
                                        value:"上午10点30分"
                                    }
                                }
                            },
                            complete: res => {
                                this.setData({
                                    isSubscribe:res.result
                                });
                                fn()
                            }
                        })
                        // .then(() => {
                        //     wx.showToast({
                        //         title: '订阅成功',
                        //         icon: 'success',
                        //         duration: 2000,
                        //     });
                        // })
                        // .catch(() => {
                        //     wx.showToast({
                        //         title: '订阅失败',
                        //         icon: 'success',
                        //         duration: 2000,
                        //     });
                        // });
                }
            },
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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