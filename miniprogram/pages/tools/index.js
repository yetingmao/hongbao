import Toast from '../../components/dist/toast/toast';
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        url: "",
        steps: [
            {
              text: '步骤一',
              desc: '去抖音获取视频的分享链接',
            },
            {
              text: '步骤二',
              desc: '获取的视频链接，如https://v.douyin.com/e5KPUNB/',
            },
            {
              text: '步骤三',
              desc: '把链接放进输入框里，点击提取',
            },
          ],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    write(e) {
        this.setData({
            url: e.detail
        })
    },
    do() {
        if (this.data.url) {
            wx.cloud.callFunction({
                name: 'gowm',
                data: {
                    url: this.data.url
                },
            })
        }else{
            Toast('请先输入链接');
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成 https://v.douyin.com/e5KPUNB/
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