<template>
	<view>
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key="index">
				<template v-if="searchType == 'post'">
					<index-list :item="item" :itemIndex="index"></index-list>
				</template>
				<template v-if-else="searchType == 'topic'">
					<topic-list :item="item" :index="index"></topic-list>
				</template>
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
	import topicList from '../../components/news/topic-list.vue';


	export default {
		components: {
			indexList,
			noThing,
			loadMore,
			topicList
		},
		data() {
			return {
				issearch: false, // 用户是否搜索过了
				loadtext: '上拉加载更多',
				list: [],
				searchtext: '',
				page: 1,
				searchType: 'post'
			}
		},
		// 监听原生标题导航按钮点击事件 (取消按钮)
		onNavigationBarButtonTap (e) {
			// console.log(JSON.stringify(e))
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
		onLoad(e) {
			if (!e) return;
			this.searchType = e.searchType || 'post';
			// #ifdef APP-PLUS
				if (this.searchType == 'topic') {
					let currentWebview = this.$mp.page.$getAppWebview();
					let tn = currentWebview.getStyle().titleNView;
					tn.searchInput.placeholder = '搜索话题';
					currentWebview.setStyle({
						titleNView: tn
					});
				}
			// #endif
		},
		methods: {
			//搜索事件
			async getdata () {
				// 显示加载logo
				uni.showLoading({title: 'Loading...'});
				// 请求服务器 this.searchtext
				let url = this.searchType == 'topic' ? "/search/topic" : "/search/post";
				let [err, res] = await this.$http.post(url, {
					keyword: this.searchtext,
					page: this.page
				}, {token: true});
				
				let error = this.$http.errorCheck(err, res, () => {
					uni.hideLoading();
					this.issearch = true;
				}, () => {
					uni.hideLoading();
					this.issearch = true;
				});
				if (!error) return;
				
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
				}
				this.list = this.page > 1 ? this.list.concat(arr) : arr;
				this.issearch = true;
				if (list.length < 10) {
					this.loadtext="没有更多数据了";
				}else{
					this.loadtext="上拉加载更多";
				}
				uni.hideLoading();
				
			},
			// 格式转化
			__format (item) {
				switch (this.searchType) {
					case "post":
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
							commentnum:item.comment_count,
							sharenum:item.sharenum,
						}
						break;
					case "topic":
						return {
							id: item.id,
							title: item.title,
							titlepic: item.titlepic,
							desc: item.desc,
							totalnum: item.post_count,
							todaynum: item.todaypost_count
						}
						break;
				}
				
			},
			// 上拉加载
			loadmore () {
				if (this.loadtext != "上拉加载更多") {return ;}
				this.loadtext = "加载中。。。";
				
				this.page++;
				this.getdata();
				
				
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
