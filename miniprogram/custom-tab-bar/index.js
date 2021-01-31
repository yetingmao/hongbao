Component({
	data: {
		active: "home",
		list: [
			{
				icon: 'bill-o',
				text: '领红包',
				url: '/pages/index/index',
				name:"home"
			},
			{
				icon: 'manager-o',
				text: '我的',
				url: '/pages/user/index',
				name:"user"
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			const temp=this.data.list.find(item=>item.name===event.detail)
			wx.switchTab({
				url: temp.url
			});
		},
		init() {
			const page = getCurrentPages().pop();
			const temp=this.data.list.find(item => item.url === `/${page.route}`)
			this.setData({
				active: temp.name
			});
		}
	}
});
