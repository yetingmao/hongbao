const db = wx.cloud.database()
const app = getApp()
let videoAd = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [],
        activeTab: 0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.createRewardedVideoAd) {
            videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-04e37f0625ceb8e0'
            })
            videoAd.onLoad(() => {
                if (videoAd) {
                    console.log('you激励视频 广告加载成功')
                    videoAd.show().catch(() => {
                      // 失败重试
                    //   console.log('you激励视频 失败重试')
                    //   videoAd.load()
                    //     .then(() => videoAd.show())
                    //     .catch(err => {
                    //       console.log('激励视频 广告显示失败')
                    //     })
                    })
                  }
            })
            videoAd.onError((err) => {})
            videoAd.onClose((res) => {})
            if (videoAd) {
                videoAd.show().catch(() => {
                  // 失败重试
                  videoAd.load()
                    .then(() => videoAd.show())
                    .catch(err => {
                      console.log('激励视频 广告显示失败')
                    })
                })
              }
        }
        db.collection('tools').get().then(res => {
            // console.log(res)
            const tabs = res.data;
            // tabs.forEach(item => {
            //     let c = item.coupon
            //     c.forEach(citem => {
            //         all.coupon.push(citem)
            //     })
            // })
            this.setData({
                tabs
            })
        })
    },

    onChange(e) {
        const index = e.detail.index
        this.setData({
            activeTab: parseInt(index)
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
    adLoad() {
        console.log('Banner 广告加载成功')
    },
    adError(err) {
        console.log('Banner 广告加载失败', err)
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