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
						<template v-else-if="!items.firstload">
							<view class="u-f-ajc" style="font-size: 50rpx, font-weight: bold; color: #ccc; padding-top: 100rpx;">
								Loading ...
							</view>
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
				newList: []
			}
		},
		onLoad () {
			uni.getSystemInfo ({
				success: (res) => {
					let height= res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			});
			this.getNav();
		},
		methods: {
			// 获取所有话题分类
			async getNav () {
				let [err, res] = await this.$http.get('/topicclass');
				if (!this.$http.errorCheck(err, res)) return;
				let list = res.data.data.list;
				let arr = [];
				let arrChild = [];
				for (let i = 0; i < list.length; i++) {
					arr.push({
						id: list[i].id,
						name: list[i].classname
					});
					arrChild.push({
						loadtext: "上拉加载更多",
						list: [],
						page: 1,
						firstload: false // 是第一次加载?
					})
				}
				this.tabBars = arr;
				this.newList = arrChild;
				this.tabBars.length > 0 && this.getList();
			},
			// 获取指定列表
			async getList () {
				let currentIndex = this.tabIndex;
				let url = `/topicclass/${this.tabBars[this.tabIndex].id}/topic/${this.newList[this.tabIndex].page}`;
				let [err,res] = await this.$http.get(url);
				let error = this.$http.errorCheck(err,res,()=>{
					this.newList[currentIndex].loadtext="上拉加载更多";
				},()=>{
					this.newList[currentIndex].loadtext="上拉加载更多";
				});
				if (!error) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push({
						id: list[i].id,
						title: list[i].title,
						titlepic: list[i].titlepic,
						type: list[i].type,
						totalnum: list[i].post_count,
						todaynum: list[i].todaypost_count
					});
				}
				this.newList[currentIndex].list = this.newList[currentIndex].page > 1 ? this.newList[currentIndex].list.concat(arr) : arr;
				this.newList[currentIndex].firstload = true;
				if (list.length < 10) {
					this.newList[currentIndex].loadtext="没有更多数据了";
				}else{
					this.newList[currentIndex].loadtext="上拉加载更多";
				}
				return;
			},
			// 上拉加载
			loadmore (index) {
				if (this.newList[index].loadtext != "上拉加载更多") {return ;}
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
					this.newList[index].loadtext = "上拉加载更多";
				}, 1000);
				// this.newList[index].loadtext = "没有更多数据了";
			},
			// 滑动事件
			tabChange (e) {
				this.tabIndex = e.detail.current;
				this.getList();
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
