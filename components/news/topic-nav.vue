<template>
	<view class="topic-nav">
		<view class="u-f-ac u-f-jsb">
			<view>热门分类</view>
			<view class="u-f-ac" @tap="openTopicNav">
				更多
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</view>
		<view class="u-f-ac">
			<block v-for="(item, index) in nav" :key="index">
				<view class="u-f-ajc">{{ item.name }}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			nav: Array
		},
		methods: {
			// 更多
			openTopicNav () {
				uni.navigateTo({
					url: '../../pages/topic-nav/topic-nav'
				})
			}
		}
	}
</script>

<style scoped>
	/* 轮播图 */
	.topic-swiper {
		padding: 0 20rpx 20rpx 20rpx;
	}
	.topic-swiper image {
		width: 100%;
		border-radius: 10rpx;
	}
	/* 热门 */
	.topic-nav {
		border-bottom: 1rpx solid #eee;
		border-top: 1rpx solid #eee;
		padding: 20rpx;
	}
	.topic-nav>view:first-child{
		margin-bottom: 10rpx;
	}
	.topic-nav>view:first-child view{
		color: #9e9e9e;
	}
	.topic-nav>view:first-child>view:first-child{
		color: #333;
		font-size: 32rpx;
	}
	.topic-nav>view:last-child>view {
		flex: 1;
		background: #ddd;
		color: #9e9e9e;
		border-radius: 10rpx;
		margin: 0 10rpx;
	}
</style>
