<template>
	<view class="index-list animated rotateIn fast">
		<view class="index-list1 u-f-ac u-f-jsb">
			<view class="u-f-ac">
				<image 
				:src="item.userpic" 
				mode="widthFix" 
				lazy-load>
				</image>
				{{ item.username }}
			</view>
			<view class="u-f-ac" v-show="!item.isguanzhu" @tap="isGuanzhu">
				<view class="icon iconfont icon-zengjia"></view>关注
			</view>
		</view>
		<view class="index-list2" @tap="opendetali">{{ item.title }}</view>
		<view class="index-list3" @tap="opendetali">
			<!-- 图片 -->
			<image :src="item.titlepic" mode="widthFix" lazy-load></image>
			<!-- 视频 -->
			<template v-if="item.type == 'video'">
				<view class="icon iconfont icon-bofang index-list-play"></view>
				<view class="index-list-playinfo">
					{{ item.playnum }}次播放 {{ item.long }}
				</view>
			</template>
			
		</view>
		<view class="index-list4 u-f-ac u-f-jsb">
			<view class="u-f-ac">
				<view class="u-f-ac" :class="{'active': (item.infonum.index == 1)}" @tap="caozuo('ding')"><view class="icon iconfont icon-icon_xiaolian-mian"></view>{{ item.infonum.dingnum }}</view>
				<view class="u-f-ac" :class="{'active': (item.infonum.index == 2)}" @tap="caozuo('cai')"><view class="icon iconfont icon-kulian"></view>{{ item.infonum.cainum }}</view>
			</view>
			<view class="u-f-ac">
				<view class="u-f-ac"><view class="icon iconfont icon-pinglun1"></view>{{ item.commentnum }}</view>
				<view class="u-f-ac"><view class="icon iconfont icon-zhuanfa"></view>{{ item.sharenum }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: {
				type: Number,
				default: null
			},
			itemIndex: Number
		},
		methods: {
			// 关注
			isGuanzhu () {
				this.$emit('guanzhu', {'index': this.index, 'itemIndex': this.itemIndex});
			},
			// 顶踩
			caozuo (data) {
				console.log(data);
				this.$emit('caozuo', {'index': this.index, 'itemIndex': this.itemIndex, 'type': data});
			},
			// 进入详情页
			opendetali () {
				uni.navigateTo({
					url: '../../pages/detail/detail?detailData=' + JSON.stringify(this.item)
				})
			}
		}
	}
</script>

<style scoped>
	.index-list {
		padding: 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.index-list1>view:first-child {
		color: #999999;
	}
	.index-list1>view:first-child image {
		width: 85rpx;
		height: 85rpx;
		border-radius: 100%;
		margin-right: 10rpx;
	}
	.index-list1>view:last-child {
		background: #f4f4f4;
		border-radius: 5rpx;
	}
	.index-list2 {
		padding-top: 15rpx;
	}
	.index-list3 {
		position: relative;
		padding-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.index-list3 image {
		width: 100%;
		border-radius: 20rpx;
	}
	/* #ifdef APP-PLUS */
	.index-list-play {
		position: absolute;
		font-size: 140rpx;
		color: #000;
		left: calc(50% - 70rpx);
		top: calc(50% - 100rpx);
	}
	/* #endif */
	.index-list-play {
		position: absolute;
		font-size: 140rpx;
		color: #fff;
	}
	.index-list-playinfo {
		position: absolute;
		background: rgba(51, 51, 51, .72);
		color: #FFFFFF;
		bottom:  8rpx;
		right: 8rpx;
		border-radius: 40rpx;
		padding: 0 12rpx;
		font-size: 22rpx;
	}
	.index-list4 {
		padding: 15rpx 0;
		color: #999999;
	}
	.index-list4>view>view>view {
		margin-right: 20rpx;
	}
	.index-list4>view>view:first-child {
		margin-right: 25rpx;
	}
	.index-list4 .active, .index-list4 .active>view {
		color: #c5f61c;
	}
</style>
