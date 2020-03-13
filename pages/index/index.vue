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
	import indexList from '../../components/index/index-list.vue';
	import swiperTabHead from '../../components/index/swiper-tab-head.vue';
	import loadMore from '../../components/common/load-more.vue';
	import noThing from '../../components/common/no-thing.vue';
	export default {
		data() {
			return {
				swiperHeight: 0,
				tabIndex: 0,
				tabBars: [],
				newList: [],
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
			});
			this.getNav();
			
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
					this.user.navigate({
						url: '../add-input/add-input',
					});
					break;
			}
		},
		methods: {
			// 获取文章分类
			async getNav () {
				let [err, res] = await this.$http.get('/postclass');
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
				let url = `/postclass/${this.tabBars[this.tabIndex].id}/post/${this.newList[this.tabIndex].page}`;
				let [err,res] = await this.$http.get(url,{},{token:true});
				let error = this.$http.errorCheck(err,res,()=>{
					this.newList[currentIndex].loadtext="上拉加载更多";
				},()=>{
					this.newList[currentIndex].loadtext="上拉加载更多";
				});
				if (!error) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
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
					commentnum:item.comment_count,
					sharenum:item.sharenum,
				}
			},
			// 上拉加载
			loadmore (index) {
				if (this.newList[index].loadtext != "上拉加载更多") {return ;}
				this.newList[index].loadtext = "加载中。。。";
				
				this.newList[this.tabIndex].page++;
				this.getList();
				
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
