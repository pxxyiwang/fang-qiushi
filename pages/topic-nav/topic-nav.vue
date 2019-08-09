<template>
	<view>
		<!-- 顶部拖拽栏 -->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items, index) in newList" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<template v-if="items.list.length > 0">
							<!-- 话题列表 -->
							<view class="topic-view">
								<block v-for="(item, itemIndex) in items.list" :key="itemIndex">
									<topic-list :item="item" :index="itemIndex"></topic-list>
								
								</block>
							</view>
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
	import noThing from '../../components/common/no-thing.vue';
	import loadMore from '../../components/common/load-more.vue';
	import topicList from '../../components/news/topic-list.vue';

	
	export default {
		components: {
			swiperTabHead,
			topicList,
			loadMore,
			noThing
		},
		data() {
			return {
				swiperHeight: 0,
				tabIndex: 0,
				tabBars: [
					{name: "关注", id: "1"},
					{name: "推荐", id: "2"},
					{name: "体育", id: "3"},
					{name: "热点", id: "4"},
					{name: "财经", id: "5"},
					{name: "新闻", id: "6"}
				],
				newList: [
					{
						loadtext: '上拉加载',
						list: [
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							}
						]
					},
					{
						loadtext: '上拉加载',
						list: [
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							}
							
						]
					},
					{
						loadtext: '上拉加载',
						list: []
					},
					{
						loadtext: '上拉加载',
						list: [
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							},
							{
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							}
						]
					},
					{
						loadtext: '上拉加载',
						list: []
					},
					{
						loadtext: '上拉加载',
						list: []
					},
					{
						loadtext: '上拉加载',
						list: []
					}
				]
			}
		},
		onLoad () {
			uni.getSystemInfo ({
				success: (res) => {
					let height= res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			})
		},
		methods: {
			// 上拉加载
			loadmore (index) {
				if (this.newList[index].loadtext != "上拉加载") {return ;}
				this.newList[index].loadtext = "加载中。。。";
				
				setTimeout(() => {
					let data = {
								titlepic: '../../static/demo/topicpic/13.jpeg', // 活体图片
								title: '#话题名称#', // 话题名称
								desc:'我是话题描述', // 描述
								totalnum: 20, // 动态
								todaynum: 5 // 今日话题量
							}
					this.newList[index].list.push(data);
					this.newList[index].loadtext = "上拉加载";
				}, 1000);
				// this.newList[index].loadtext = "没有更多数据了";
			},
			// 滑动事件
			tabChange (e) {
				this.tabIndex = e.detail.current;
			},
			// tabber点击事件
			tabtap (index) {
				this.tabIndex = index;
			}
		}
	}
</script>

<style>
	.topic-view {
		padding: 0 20rpx;
	}
</style>
