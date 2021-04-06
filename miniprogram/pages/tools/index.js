const db = wx.cloud.database()
const app = getApp()
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

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