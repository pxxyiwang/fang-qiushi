<template>
	<view class="body">
		
		<!-- 操作菜单 -->
		<paper-left-popup :show="show" @hidepopup="hidepopup" @addfriend="addfriend" @clear="clear" @showpopup="showpopup"></paper-left-popup>
		
		<!-- 小纸条列表 -->
		<block v-for="(item, index) in paperList" :key="index">
			<paper-list :item="item" :index="index"></paper-list>
		</block>
		
		<!-- 上拉加载 -->
		<load-more :loadtext="loadtext"></load-more>
	</view>
</template>

<script>
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue";
	import paperList from "../../components/paper/paper-list.vue";
	import loadMore from '../../components/common/load-more.vue';

	export default {
		components: {
			paperLeftPopup,
			paperList,
			loadMore
		},
		data() {
			return {
				show: false,
				loadtext: '上拉加载',
				paperList: [
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 100
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 0
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 100
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 0
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 100
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 99
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 10
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 10
					},
					{
						username: '昵称',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 10
					}
				]
			}
		},
		// 监听下拉刷新功能
		onPullDownRefresh() {
			this.getDowmRefresh();
		},
		// 下拉触底事件
		onReachBottom() {
			// 上拉加载
			this.loadmore();
		},
		// 监听导航按钮事件
		onNavigationBarButtonTap(e) {
			switch(e.index) {
				case 0:
					
					uni.navigateTo({
						url: '../user-list/user-list'
					})
					this.hidepopup();
					break;
				case 1:
					this.showpopup();
					break;
			}
		},
		methods: {
			addfriend () {
				console.log('加糗友')
				this.hidepopup();
			},
			// 清除事件
			clear () {
				console.log('清除缓存')
				this.hidepopup();
			},
			// 隐藏popup
			hidepopup () {
				this.show = false;
			},
			// 显示popup
			showpopup () {
				this.show = true;
			},
			// 获取下拉刷新数据
			getDowmRefresh () {
					setTimeout(() => {
						// 获取数据
						let data = [
							{
								username: '忆忘',
								userpic:'../../static/demo/userpic/12.jpg',
								time: '10:12',
								dada: '我是信息',
								noreadnum: 100
							},
							{
								username: '忆忘',
								userpic:'../../static/demo/userpic/12.jpg',
								time: '10:12',
								dada: '我是信息',
								noreadnum: 100
							},
							{
								username: '忆忘',
								userpic:'../../static/demo/userpic/12.jpg',
								time: '10:12',
								dada: '我是信息',
								noreadnum: 100
							},
							{
								username: '忆忘',
								userpic:'../../static/demo/userpic/12.jpg',
								time: '10:12',
								dada: '我是信息',
								noreadnum: 100
							},
						];
						
						// 赋值
						this.paperList = data;
						uni.stopPullDownRefresh();
					}, 2000)
				
			},
			// 上拉加载
			loadmore (index) {
				if (this.loadtext != "上拉加载") {return ;}
				this.loadtext = "加载中。。。";
				
				setTimeout(() => {
					let data = {
						username: '痴痴',
						userpic:'../../static/demo/userpic/12.jpg',
						time: '10:12',
						dada: '我是信息',
						noreadnum: 10
					}
					this.paperList.push(data);
					this.loadtext = "上拉加载";
				}, 1000);
				// this.dataList.loadtext = "没有更多数据了";
			}
		}
	}
</script>

<style scoped>
	.body {
		padding: 0 20rpx;
	
	}
</style>
