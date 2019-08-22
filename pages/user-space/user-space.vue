<template>
	<view>
		<!-- 操作菜单 -->
		<user-space-popup :show="show" @hide="hidepopup" @lahei="lahei" @beizhu="beizhu"></user-space-popup>
		
		<!-- 背景图 + 用户基本信息 -->
		<user-space-head :userinfo="userinfo" @changeBgimg="changeBgimg" @gaunZhu="gaunZhu"></user-space-head>
		
		<!-- 统计 -->
		<view class="user-space-data">
			<home-data :dataList="spacedata"></home-data>
		</view>
		
		<!-- 导航  tab切换 -->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollStyle="border-bottom: 0;" scrollItemStyle="width: 33.33%;"></swiper-tab-head>
		
		<block v-for="(items, index) in tabList" :key="index">
			<template v-if="tabIndex == index">
				<template v-if="tabIndex == 0">
					<!-- 主页 -->
					<user-space-userinfo :dataList="userinfo"></user-space-userinfo>
				</template>
				<template v-else>
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
			</template>
		</block>
		
		
		
	</view>
</template>

<script>
	import userSpaceHead from '../../components/user-space/user-space-head.vue';
	import homeData from '../../components/home/home-data.vue';
	import swiperTabHead from '../../components/index/swiper-tab-head.vue';
	import userSpaceUserinfo from '../../components/user-space/user-space-userinfo.vue';
	import commonList from '../../components/common/common-list.vue';
	import loadMore from '../../components/common/load-more.vue';
	import noThing from '../../components/common/no-thing.vue';
	import userSpacePopup from '../../components/user-space/user-space-popup.vue';

	export default {
		components: {
			userSpaceHead,
			homeData,
			swiperTabHead,
			userSpaceUserinfo,
			commonList,
			loadMore,
			noThing,
			userSpacePopup
		},
		data() {
			return {
				show: false,
				userinfo: {
					bgimg: 5,
					userpic: '../../static/demo/userpic/6.jpg',
					userName: '昵称',
					sex: 0,
					age: 20,
					isguanzhu: false,
					regTime: '2019-04-11',
					id: 123123,
					birthday: "1994-07-05",
					job: 'IT',
					path: '四川达州',
					qg: '未婚'
				},
				spacedata: [
					{name: "获赞", num: "10k"},
					{name: "关注", num: 11},
					{name: "粉丝", num: 12}
				],
				tabIndex: 0,
				tabBars: [
					{name: '主页', id: 'zhuye'},
					{name: '糗事', id: 'qiushi'},
					{name: '动态', id: 'dongtai'}
				],
				tabList: [
					{},
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
		onNavigationBarButtonTap (e) {
			if (e.index === 0) {
				this.hidepopup();
			}
		},
		methods: {
			// 显示隐藏 -拉黑 -备注
			hidepopup () {
				this.show = !this.show;
			},
			// 拉黑
			lahei () {
				console.log('拉黑');
				this.hidepopup();
			},
			// 备注
			beizhu () {
				console.log('备注');
				this.hidepopup();
			},
			// 是否关注
			gaunZhu () {
				this.userinfo.isguanzhu = !this.userinfo.isguanzhu;
			},
			// 切换背景
			changeBgimg () {
				let no = parseInt(this.userinfo.bgimg);
				this.userinfo.bgimg = no < 5 ? ++no : 1;
				console.log(no);
			},
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
			}
		}
	}
</script>

<style scoped>
	.user-space-margin {
		margin: 15rpx;
	}
	.user-space-data {
		background: #fff;
		position: relative;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		margin-top: -15rpx;
		z-index: 10;
	}
	
</style>
