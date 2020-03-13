<template>
	<view>
		<!-- 自定义导航栏 -->
		<new-nav-bar :tabIndex="tabIndex" :tabBars="tabBars" @changeTab="changeTab"></new-nav-bar>
		
		<!-- 列表 -->
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabIndex" @change="tabChange">
				<!-- 关注 -->
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="loadmore">
						<template v-if="dataList.list.length > 0">
							<block v-for="(item, index) in dataList.list" :key="index">
								<common-list :item="item" :index="index" @guanzhu="guanzhu"></common-list>
							</block>
							<!-- 上拉加载 -->
							<load-more :loadtext="dataList.loadtext"></load-more>
						</template>
						<template v-else>
							<!--  无内容 -->
							<no-thing></no-thing>
						</template>
					</scroll-view>
				</swiper-item>
				<!-- 话题 -->
				<swiper-item>
					<scroll-view scroll-y class="list">
						<!-- 搜索框 -->
						<view class="search-input">
							<input class="uni-input" placeholder="搜索话题" placeholder-class=" icon iconfont icon-sousuo topic-search" @tap="openSearch"/>
						</view>
						
						<!-- 轮播图 -->
						<swiper class="topic-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<block v-for="(item, index) in topic.swiper" :key="index">
								<swiper-item>
									<image :src="item.src" mode="widthFix" lazy-load></image>
								</swiper-item>
							</block>
						</swiper>
						
						<!-- 热门分类 -->
						<topic-nav :nav="topic.nav"></topic-nav>
						
						<!-- 最近更新 -->
						<view class="topic-new">
							<view>最近更新</view>
							<block v-for="(item, itemIndex) in topic.list" :key="itemIndex">
								<topic-list :item="item" :index="itemIndex"></topic-list>
							</block>
							
						</view>
						
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		
	</view>
</template>

<script>
	import newNavBar from "../../components/news/news-nav-bar.vue"
	import commonList from "../../components/common/common-list.vue"
	import noThing from '../../components/common/no-thing.vue';
	import loadMore from '../../components/common/load-more.vue';
	import topicNav from '../../components/news/topic-nav.vue';
	import topicList from '../../components/news/topic-list.vue';

	export default {
		components: {
			newNavBar,
			commonList,
			noThing,
			loadMore,
			topicNav,
			topicList
		},
		data() {
			return {
				swiperHeight: 0,
				tabIndex: 0,
				tabBars: [
					{name: '关注', id: 'guanzhu'},
					{name: '话题', id: 'topic'}
				],
				dataList: {
					loadtext: '上拉加载',
					list: [
						// 图文
						{
							userpic: '../../static/demo/datapic/1.jpg', // 头像
							username: '忆忘', // 昵称
							sex: 1, // 0 男 1 女
							age: 25, // 年龄
							isguanzhu: false, // 是否关注
							title: '黑夜的烟火,绚丽而短暂', // 标题
							titlepic: '../../static/demo/datapic/14.jpg', // 主题 图片
							video: false, // 主题 视屏
							share: false, // 主题 分享
							path: "深圳 龙岗", // 地址
							sharenum: 20, // 分享数量
							commentnum: 30, // 评论数
							goodnum: 20 // 点赞
							
						},
						// 视屏
						{
							userpic: '../../static/demo/datapic/1.jpg', // 头像
							username: '忆忘', // 昵称
							sex: 0, // 0 男 1 女
							age: 25, // 年龄
							isguanzhu: false, // 是否关注
							title: '黑夜的烟火,绚丽而短暂', // 标题
							titlepic: '../../static/demo/datapic/12.jpg', // 主题 图片
							video: {
								looknum: '20w',
								long: '2:20'
							}, // 主题 视屏
							share: false, // 主题 分享
							path: "深圳 龙岗", // 地址
							sharenum: 20, // 分享数量
							commentnum: 30, // 评论数
							goodnum: 20 // 点赞
							
						},
						{
							userpic: '../../static/demo/datapic/1.jpg', // 头像
							username: '忆忘', // 昵称
							sex: 1, // 0 男 1 女
							age: 25, // 年龄
							isguanzhu: false, // 是否关注
							title: '黑夜的烟火,绚丽而短暂', // 标题
							titlepic: '../../static/demo/datapic/12.jpg', // 主题 图片
							video: {
								looknum: '50w',
								long: '2:20'
							}, // 主题 视屏
							share: false, // 主题 分享
							path: "深圳 龙岗", // 地址
							sharenum: 20, // 分享数量
							commentnum: 30, // 评论数
							goodnum: 20 // 点赞
							
						},
						// 分享
						{
							userpic: '../../static/demo/datapic/1.jpg', // 头像
							username: '忆忘', // 昵称
							sex: 1, // 0 男 1 女
							age: 25, // 年龄
							isguanzhu: false, // 是否关注
							title: '黑夜的烟火,绚丽而短暂', // 标题
							titlepic: '', // 主题 图片
							video: false, // 主题 视屏
							share: {
								title: '远处只适合遥望......',
								titlepic: '../../static/demo/datapic/1.jpg'
							}, // 主题 分享
							path: "深圳 龙岗", // 地址
							sharenum: 20, // 分享数量
							commentnum: 30, // 评论数
							goodnum: 20 // 点赞
							
						},
						{
							userpic: '../../static/demo/datapic/1.jpg', // 头像
							username: '忆忘', // 昵称
							sex: 0, // 0 男 1 女
							age: 25, // 年龄
							isguanzhu: false, // 是否关注
							title: '黑夜的烟火,绚丽而短暂', // 标题
							titlepic: '', // 主题 图片
							video: false, // 主题 视屏
							share: {
								title: '远处只适合遥望......',
								titlepic: '../../static/demo/datapic/1.jpg'
							}, // 主题 分享
							path: "深圳 龙岗", // 地址
							sharenum: 20, // 分享数量
							commentnum: 30, // 评论数
							goodnum: 20 // 点赞
							
						}
					]
				},
				// 话题
				topic: {
					swiper: [],
					nav: [],
					list: []
				}
			}
		},
		onLoad () {
			uni.getSystemInfo ({
				success: (res) => {
					let height= res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			});
			
			this.__init();
			
		},
		methods: {
			// 点击搜索
			openSearch () {
				uni.navigateTo({
					url: '../search/search?searchType=topic'
				})
			},
			// 初始化数据
			__init () {
				this.getSwiper();
				this.getNav();
				this.getHot();
			},
			// 获取广告
			async getSwiper () {
				let [err, res] = await this.$http.get('/adsense/0');
				if (!this.$http.errorCheck(err, res)) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push({
						src: list[i].src,
						url: list[i].url,
						id: list[i].id,
						type: list[i].type
					});
				}
				this.topic.swiper = arr;
			},
			// 获取热门分类
			async getNav(){
				let [err, res] = await this.$http.get('/topicclass');
				if (!this.$http.errorCheck(err, res)) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push({
						id: list[i].id,
						name: list[i].classname
					});
				}
				this.topic.nav = arr;
			},
			// 获取热门话题
			async getHot(){
				let [err, res] = await this.$http.get('/hottopic');
				if (!this.$http.errorCheck(err, res)) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push({
						id: list[i].id,
						title: list[i].title,
						titlepic: list[i].titlepic,
						type: list[i].type,
						desc: list[i].desc,
						totalnum: list[i].post_count,
						todaynum: list[i].todaypost_count
					});
				}
				this.topic.list = arr;
			},
			// 导航栏内容切换
			changeTab (index) {
				this.tabIndex = index;
			},
			// 关注
			guanzhu (index) {
				this.dataList.list[index].isguanzhu = true;
				uni.showToast({
					title: '关注成功！'
				});
			},
			// 上拉加载
			loadmore (index) {
				if (this.dataList.loadtext != "上拉加载") {return ;}
				this.dataList.loadtext = "加载中。。。";
				
				setTimeout(() => {
					let data = {
						userpic: '../../static/demo/datapic/1.jpg', // 头像
						username: '忆忘', // 昵称
						sex: 1, // 0 男 1 女
						age: 25, // 年龄
						isguanzhu: false, // 是否关注
						title: '黑夜的烟火,绚丽而短暂', // 标题
						titlepic: '../../static/demo/datapic/14.jpg', // 主题 图片
						video: false, // 主题 视屏
						share: false, // 主题 分享
						path: "深圳 龙岗", // 地址
						sharenum: 20, // 分享数量
						commentnum: 30, // 评论数
						goodnum: 20 // 点赞
						
					}
					this.dataList.list.push(data);
					this.dataList.loadtext = "上拉加载";
				}, 1000);
				// this.dataList.loadtext = "没有更多数据了";
			},
			// 滑动事件
			tabChange (e) {
				this.tabIndex = e.detail.current;
			}
		}
	}
</script>

<style scoped>
	.search-input {
		padding: 20rpx;
		
	}
	.search-input input {
		background: #f4f4f4;
		border-radius: 10rpx;
	}
	.topic-search {
		display: flex;
		justify-content: center;
		font-size: 27rpx;
	}
	
	/* 最新话题 */
	.topic-new {
		padding: 20rpx;
	}
	.topic-new>view:first-child {
		padding-bottom: 5rpx;
		font-size: 32rpx;
	}
	
	
</style>
