<template>
	<view class="icon iconfont tag-sex" :class="[sex == 0 ? ' icon-nan': 'icon-nv']">{{ age }}</view>
</template>

<script>
	export default {
		props: {
			sex: Number,
			age: {
				type: Number,
				default: null
			}
		}
	}
</script>

<style scoped>
	.tag-sex {
		background: #007AFF;
		color: #fff;
		font-size: 23rpx;
		padding: 2rpx 10rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
		line-height: 28rpx;
	}
	.icon-nv {
		background: #ff698d!important;
	}
</style>
