<template>
	<view>
		<!-- 模糊背景  话题信息 -->
		<topic-info :topicInfo="topicInfo"></topic-info>
		
		<!-- table切换 -->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollStyle="border-bottom: 0;" scrollItemStyle="width: 50%;"></swiper-tab-head>
		
		<!-- 列表 -->
		<view class="topic-detail-list">
			<block v-for="(items, index) in tabList" :key="index">
				<template v-if="tabIndex == index">
					<template v-if="items.list.length > 0">
						<!-- 列表 -->
						<block v-for="(list, indexItem) in items.list" :key="indexItem">
							<common-list :item="list" :index="index"></common-list>
						</block>
						
						<!-- 上拉加载 -->
						<load-more :loadtext="items.loadtext"></load-more>
					</template>
					<template v-else>
						<!--  无内容 -->
						<no-thing></no-thing>
					</template>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
	import topicInfo from '../../components/topic/topic-info.vue';
	import swiperTabHead from '../../components/index/swiper-tab-head.vue';
	import commonList from '../../components/common/common-list.vue';
	import loadMore from '../../components/common/load-more.vue';
	import noThing from '../../components/common/no-thing.vue';

	
	export default {
		components: {
			topicInfo,
			swiperTabHead,
			commonList,
			loadMore,
			noThing
		},
		data() {
			return {
				topicInfo: {
					titlepic: '../../static/demo/topicpic/13.jpeg',
					title: '忆往事，敬余生',
					desc:'我是描述',
					totalnum: '1000',
					todaynum: '200',
				},
				tabIndex: 0,
				tabBars: [
					{name: '默认', id: 'moren'},
					{name: '最新', id: 'zuixin'}
				],
				tabList: [
					{
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
					{
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
					}
				]
			}
		},
		// 下拉触底事件
		onReachBottom() {
			// 上拉加载
			this.loadmore();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getDownRefresh();
		},
		methods: {
			// tabber点击事件
			tabtap (index) {
				this.tabIndex = index;
			},
			// 上拉加载
			loadmore () {
				if (this.tabList[this.tabIndex].loadtext != "上拉加载") {return ;}
				this.tabList[this.tabIndex].loadtext = "加载中。。。";
				
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
					this.tabList[this.tabIndex].list.push(data);
					this.tabList[this.tabIndex].loadtext = "上拉加载";
				}, 1000);
				// this.tabList[this.tabIndex].loadtext = "没有更多数据了";
			},
			// 下拉刷新
			getDownRefresh () {
				
				setTimeout(() => {
					// 获取数据
					let data = [
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
							
						}
					];
					
					// 赋值
					this.tabList[this.tabIndex].list = data;
					uni.stopPullDownRefresh();
				}, 2000)
			}
		}
	}
</script>

<style scoped>
 
</style>
