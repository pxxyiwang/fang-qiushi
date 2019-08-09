<template>
	<view>
		<!-- 顶部拖拽栏 -->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items, index) in newList" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<template v-if="items.list.length > 0">
							<!-- 图文加载 -->
							<block v-for="(item, itemIndex) in items.list" :key="itemIndex">
								<index-list :item="item" :itemIndex="itemIndex" :index="index" @guanzhu="guanzhu" @caozuo="caozuo"></index-list>
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
	import indexList from '../../components/index/index-list.vue';
	import swiperTabHead from '../../components/index/swiper-tab-head.vue';
	import loadMore from '../../components/common/load-more.vue';
	import noThing from '../../components/common/no-thing.vue';
	export default {
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
								userpic: "../../static/demo/userpic/12.jpg", // 用户头像
								username: "昵称", // 用户昵称
								isguanzhu: false, // 是否关注
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
							},
							{
								userpic: "../../static/demo/userpic/12.jpg", // 用户头像
								username: "昵称", // 用户昵称
								isguanzhu: false, // 是否关注
								title: "我是标题", // 标题
								type: "video", // img: 图文， video: 视频
								titlepic: "../../static/demo/datapic/11.jpg", // 标题图片
								playnum: "20w", // 播放次数
								long: "2:47", // 视频时长
								infonum: {  // 点赞
									index: 2, // 0：没有操作  1：点赞 2： 踩
									dingnum: 11, // 点赞数量
									cainum: 11,  // 踩
								}, 
								commentnum: 0, // 评论
								sharenum: 11, // 转发（分享）
							},
							{
								userpic: "../../static/demo/userpic/12.jpg", // 用户头像
								username: "昵称", // 用户昵称
								isguanzhu: false, // 是否关注
								title: "我是标题", // 标题
								type: "video", // img: 图文， video: 视频
								titlepic: "../../static/demo/datapic/11.jpg", // 标题图片
								playnum: "20w", // 播放次数
								long: "2:47", // 视频时长
								infonum: {  // 点赞
									index: 1, // 0：没有操作  1：点赞 2： 踩
									dingnum: 11, // 点赞数量
									cainum: 11,  // 踩
								}, 
								commentnum: 0, // 评论
								sharenum: 11, // 转发（分享）
							}
						]
					},
					{
						loadtext: '上拉加载',
						list: [
							{
								userpic: "../../static/demo/userpic/12.jpg", // 用户头像
								username: "昵称", // 用户昵称
								isguanzhu: false, // 是否关注
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
							},
							{
								userpic: "../../static/demo/userpic/12.jpg", // 用户头像
								username: "昵称", // 用户昵称
								isguanzhu: false, // 是否关注
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
							},
							{
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
							},
							{
								userpic: "../../static/demo/userpic/12.jpg", // 用户头像
								username: "昵称", // 用户昵称
								isguanzhu: true, // 是否关注
								title: "我是标题", // 标题
								type: "video", // img: 图文， video: 视频
								titlepic: "../../static/demo/datapic/11.jpg", // 标题图片
								playnum: "20w", // 播放次数
								long: "2:47", // 视频时长
								infonum: {  // 点赞
									index: 2, // 0：没有操作  1：点赞 2： 踩
									dingnum: 11, // 点赞数量
									cainum: 11,  // 踩
								}, 
								commentnum: 0, // 评论
								sharenum: 11, // 转发（分享）
							},
							{
								userpic: "../../static/demo/userpic/12.jpg", // 用户头像
								username: "昵称", // 用户昵称
								isguanzhu: true, // 是否关注
								title: "我是标题", // 标题
								type: "video", // img: 图文， video: 视频
								titlepic: "../../static/demo/datapic/11.jpg", // 标题图片
								playnum: "20w", // 播放次数
								long: "2:47", // 视频时长
								infonum: {  // 点赞
									index: 1, // 0：没有操作  1：点赞 2： 踩
									dingnum: 11, // 点赞数量
									cainum: 11,  // 踩
								}, 
								commentnum: 0, // 评论
								sharenum: 11, // 转发（分享）
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
		components: {
			indexList,
			swiperTabHead,
			loadMore,
			noThing
		},
		onLoad () {
			uni.getSystemInfo ({
				success: (res) => {
					let height= res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			})
		},
		// 监听搜索框点击事件
		onNavigationBarSearchInputClicked () {
			uni.navigateTo({
				url: '../search/search'
			})
		},
		// 监听原生标题导航按钮点击事件
		onNavigationBarButtonTap (e) {
			switch (e.index) {
				case 1:
					// 打开发布页面
					uni.navigateTo({
						url: '../add-input/add-input',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					break;
			}
		},
		methods: {
			// 上拉加载
			loadmore (index) {
				if (this.newList[index].loadtext != "上拉加载") {return ;}
				this.newList[index].loadtext = "加载中。。。";
				
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
					this.newList[index].list.push(data);
					this.newList[index].loadtext = "上拉加载";
				}, 1000);
				// this.newList[index].loadtext = "没有更多数据了";
			},
			// tabber点击事件
			tabtap (index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange (e) {
				this.tabIndex = e.detail.current;
			},
			// 关注
			guanzhu (data) {
				
				this.newList[data.index].list[data.itemIndex].isguanzhu = true;
				uni.showToast({
					title: '关注成功！'
				})
			},
			// 顶踩
			caozuo (res) {
				console.log(res);
				let data = this.newList[res.index].list[res.itemIndex];
				switch (res.type) {
					case 'ding':
						if (data.infonum.index == 1) {return;}
						data.infonum.dingnum++;
						if(data.infonum.index == 2) {
							data.infonum.cainum--;;
						}
						data.infonum.index = 1;
						
						break;
					case 'cai':
						if (data.infonum.index == 1) {
							data.infonum.dingnum--;
						}
						if(data.infonum.index == 2) {return;}
						data.infonum.cainum++;;
						data.infonum.index = 2;
						break;
				}
			}
		}
	}
</script>

<style>
	
</style>
