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
					<template v-else-if="!items.firstload">
						<view class="u-f-ajc" style="font-size: 50rpx, font-weight: bold; color: #ccc; padding-top: 100rpx;">
							Loading ...
						</view>
					</template>
					<template v-else>
						<!--  无内容 -->
						<view class="u-f-ac u-f-ajc">
							<!-- <no-thing></no-thing> -->
							<text>暂无数据！</text>
						</view>
						
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
					// id: '',
					// titlepic: '../../static/demo/topicpic/13.jpeg',
					// title: '忆往事，敬余生',
					// desc:'我是描述',
					// totalnum: '1000',
					// todaynum: '200',
				},
				tabIndex: 0,
				tabBars: [
					{name: '默认', id: 'moren'},
					{name: '最新', id: 'zuixin'}
				],
				tabList: [
					{
						loadtext: '上拉加载更多',
						list: [],
						firstload: false,
						page: 1
					},
					{
						loadtext: '上拉加载更多',
						list: [],
						firstload: false,
						page: 1
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
		onLoad (e) {
			this.__init(JSON.parse(e.detail));
			// this.__init(e.detail);
		},
		methods: {
			// 初始化
			__init (obj) {
				// 修改标题
				uni.setNavigationBarTitle({title: obj.title});
				// 赋值
				this.topicInfo = obj;
 				// 获取列表数据
				this.getList();
			},
			// 获取数据
			async getList () {
				let url = `/topic/${this.topicInfo.id}/post/${this.tabList[this.tabIndex].page}`;
				let [err,res] = await this.$http.get(url,{},{token:true});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) {
					return this.tabList[this.tabIndex].loadtext="上拉加载更多";
				}
				
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
				}
				this.tabList[this.tabIndex].list = this.tabList[this.tabIndex].page > 1 ? this.tabList[this.tabIndex].list.concat(arr) : arr;
				this.tabList[this.tabIndex].firstload = true;
				return this.tabList[this.tabIndex].loadtext=(list.length < 10) ? "没有更多数据了" : "上拉加载更多";
			},
			// 格式转化
			__format (item) {
				return {
					userid:item.user.id,
					userpic:item.user.userpic,
					username :item.user.username,
					isguanzhu:!!item.user.fens.length,
					id:item.id,
					title:item.title,
					type:"img", // img:图文,video:视频
					titlepic:item.titlepic,
					video:false,
					path:item.path,
					share:!!item.share,
					infonum:{
						index:(item.support.length>0) ? (item.support[0].type+1) : 0,//0:没有操作，1:顶,2:踩；
						dingnum:item.ding_count,
						cainum:item.cai_count,
					},
					goodnum: item.ding_count,
					commentnum:item.comment_count,
					sharenum:item.sharenum,
				}
			},
			// tabber点击事件
			tabtap (index) {
				this.tabIndex = index;
				this.tabList[this.tabIndex].page = 1;
				this.getList();
			},
			// 上拉加载
			loadmore () {
				if (this.tabList[this.tabIndex].loadtext != "上拉加载更多") {return ;}
				this.tabList[this.tabIndex].loadtext = "加载中。。。";
				
				// 页数++
				this.tabList[this.tabIndex].page++;
				
				// 获取数据
				this.getList();
			},
			// 下拉刷新
			getDownRefresh () {
				// this.getList();
			}
		}
	}
</script>

<style scoped>
 
</style>
