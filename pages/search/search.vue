<template>
	<view>
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key="index">
				<index-list :item="item" :itemIndex="index"></index-list>
			</block>
			<load-more :loadtext="loadtext"></load-more>

		</template>
		<template v-else-if="issearch && list.length < 1">
			<no-thing></no-thing>
		</template>
		
	</view>
</template>

<script>
	import indexList from "../../components/index/index-list.vue";
	import noThing from '../../components/common/no-thing.vue';
	import loadMore from '../../components/common/load-more.vue';


	export default {
		components: {
			indexList,
			noThing,
			loadMore
		},
		data() {
			return {
				issearch: false,
				loadtext: '上拉加载',
				list: [],
				searchtext: ''
			}
		},
		// 监听原生标题导航按钮点击事件 (取消按钮)
		onNavigationBarButtonTap (e) {
			console.log(JSON.stringify(e))
			if(e.index === 0) {
				uni.navigateBack({
					delte: 1
				})
			}
		},
		// 监听搜索框文本变化
		onNavigationBarSearchInputChanged (e) {
			this.searchtext = e.text;
		},
		// 监听点击搜索按钮事件
		onNavigationBarSearchInputConfirmed (e) {
			// console.log("按钮" + e.text);
			if (this.searchtext) {
				this.getdata();
			}
		},
		// 监听页面触底事件
		onReachBottom() {
			this.loadmore();
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.searchtext) {
				this.getPullDown();
			}
		},
		methods: {
			//搜索事件
			getdata () {
				// 请求服务器 this.searchtext
				
				// 显示加载logo
				uni.showLoading();
				setTimeout(() => {
					let data = [{
						userpic: "../../static/demo/userpic/12.jpg", // 用户头像
						username: "昵称", // 用户昵称
						isguanzhu: true, // 是否关注
						title: "我是标题", // 标题
						type: "img", // img: 图文， video: 视频
						titlepic: "../../static/demo/datapic/11.jpg", // 标题图片
						playnum: "20w", // 播放次数
						long: "2:47", // 视频时长
						infonum: {  // 点赞
							index: 0, // 0：没有操作  1：点赞 2： 踩
							dingnum: 11, // 点赞数量
							cainum: 11,  // 踩
						}, 
						commentnum: 0, // 评论
						sharenum: 11, // 转发（分享）
					}];
					
					// 赋值
					this.list = data;
					// 取消加载logo
					uni.hideLoading();
					this.issearch = true;
				}, 1000);
				
			},
			// 上拉加载
			loadmore () {
				if (this.loadtext != "上拉加载") {return ;}
				this.loadtext = "加载中。。。";
				
				setTimeout(() => {
					let data = {
						userpic: "../../static/demo/userpic/12.jpg", // 用户头像
						username: "昵称", // 用户昵称
						isguanzhu: true, // 是否关注
						title: "我是标题", // 标题
						type: "img", // img: 图文， video: 视频
						titlepic: "../../static/demo/datapic/11.jpg", // 标题图片
						playnum: "20w", // 播放次数
						long: "2:47", // 视频时长
						infonum: {  // 点赞
							index: 0, // 0：没有操作  1：点赞 2： 踩
							dingnum: 11, // 点赞数量
							cainum: 11,  // 踩
						}, 
						commentnum: 0, // 评论
						sharenum: 11, // 转发（分享）
					}
					this.list.push(data);
					this.loadtext = "上拉加载";
				}, 1000);
				// this.loadtext = "没有更多数据了";
			},
			// 下拉刷新
			getPullDown () {
				// 请求服务器 this.searchtext
				
				setTimeout(() => {
					let data = [{
						userpic: "../../static/demo/userpic/12.jpg", // 用户头像
						username: "平行线下", // 用户昵称
						isguanzhu: true, // 是否关注
						title: "我是标题", // 标题
						type: "img", // img: 图文， video: 视频
						titlepic: "../../static/demo/datapic/11.jpg", // 标题图片
						playnum: "20w", // 播放次数
						long: "2:47", // 视频时长
						infonum: {  // 点赞
							index: 0, // 0：没有操作  1：点赞 2： 踩
							dingnum: 11, // 点赞数量
							cainum: 11,  // 踩
						}, 
						commentnum: 0, // 评论
						sharenum: 11, // 转发（分享）
					}];
					
					// 赋值
					this.list = data;
					this.issearch = true;
					uni.stopPullDownRefresh();
				}, 1000);
			}
		}
	}
</script>

<style>

</style>
