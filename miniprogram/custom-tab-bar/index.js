const db = wx.cloud.database()
Component({
	data: {
		active: "home",
		list: [
			// {
			// 	icon: 'bill-o',
			// 	text: '领红包',
			// 	url: '/pages/index/index',
			// 	name: "home"
			// },
			// {
			// 	"icon": "apps-o",
			// 	"text": "工具",
			// 	"url": "/pages/tools/index",
			// 	"name": "tools"
			// },
			// {
			// 	"icon": "video-o",
			// 	"text": "视频",
			// 	"url": "/pages/video/index",
			// 	"show":true,
			// 	"name": "video"
			// },
			// {
			// 	"icon": "gift-o",
			// 	"text": "购物红包",
			// 	"url": "/pages/buy/index",
			// 	"show":false,
			// 	"name": "buy"
			// },
			// {
			// 	"icon": "video-o",
			// 	"text": "视频",
			// 	"url": "/pages/video/index",
			// 	"show":true,
			// 	"name": "video"
			// },
			{
				icon: 'description',
				text: '阅读',
				url: '/pages/article/index',
				name: "article"
			},
			{
				icon: 'manager-o',
				text: '我的',
				url: '/pages/user/index',
				name: "user"
			}
		]
	},
	created() {
		db.collection('tabbar').get().then(res => {
			const data=res.data[0].list.filter(item=>item.show)
			this.setData({
				list: data
			})
		})
	},
	methods: {
		onChange(event) {
			this.setData({
				active: event.detail
			});
			const temp = this.data.list.find(item => item.name === event.detail)
			wx.switchTab({
				url: temp.url
			});
		},
		init() {
			const page = getCurrentPages().pop();
			const temp = this.data.list.find(item => item.url === `/${page.route}`)
			this.setData({
				active: temp.name
			});
		}
	}
});