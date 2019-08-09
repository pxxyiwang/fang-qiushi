<template>
	<view class="body">
		<!-- tab切换 -->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" scrollItemStyle="width: 33%;" scrollStyle="border-bottom: 0;" @tabtap="tabtap"></swiper-tab-head>
		
		<!-- 好友列表 -->
		<!-- <block v-for="(item, index) in list" :key="index">
			<user-list :item="item" :index="index"></user-list>
		</block> -->
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items, index) in newList" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<template v-if="items.list.length > 0">
							<!-- 图文加载 -->
							<block v-for="(item, itemIndex) in items.list" :key="itemIndex">
								<user-list :item="item" :index="index" :itemIndex="itemIndex"></user-list>
							</block>
							<!-- 上拉加载 -->
							<load-more :loadtext="items.loadtext"></load-more>
						</template>
						<template v-else>
							<!--  无内容 -->
							<no-thing></no-thing>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		
	</view>
</template>

<script>
	import swiperTabHead from '../../components/index/swiper-tab-head.vue';
	import userList from '../../components/user-list/user-list.vue';
	import loadMore from '../../components/common/load-more.vue';
	import noThing from '../../components/common/no-thing.vue';

	export default {
		components: {
			swiperTabHead,
			userList,
			loadMore,
			noThing
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [
					{name: "互关", id: "huguan", num: 10},
					{name: "关注", id: "guanzhu", num: 10},
					{name: "粉丝", id: "fensi", num: 10}
				],
				newList: [
					{
						loadtext: '上拉加载',
						list: [
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							}
						],
					},
					{
						loadtext: '上拉加载',
						list: [
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							}
						],
					},
					{
						loadtext: '上拉加载',
						list: [
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							}
						],
					}
				],
				swiperHeight: 0,
			}
		},
		onLoad () {
			// 页面加载获取高度
			uni.getSystemInfo ({
				success: (res) => {
					let height= res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			})
		},
		// 监听导航按钮事件
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				uni.navigateBack({
					delta: 1
				})
			}
		},
		methods: {
			// tabber点击事件
			tabtap (index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange (e) {
				this.tabIndex = e.detail.current;
			},
			// 上拉加载
			loadmore (index) {
				if (this.newList[index].loadtext != "上拉加载") {return ;}
				this.newList[index].loadtext = "加载中。。。";
				
				setTimeout(() => {
					let data = {
								userpic: '../../static/demo/userpic/12.jpg',
								username: '昵称',
								age: 20,
								sex: 1,
								isguanzhu: false
							}
					this.newList[index].list.push(data);
					this.newList[index].loadtext = "上拉加载";
				}, 1000);
				// this.newList[index].loadtext = "没有更多数据了";
			}
		}
	}
</script>

<style scoped>
	.body {
		padding: 0 20rpx;
	}
	
</style>
