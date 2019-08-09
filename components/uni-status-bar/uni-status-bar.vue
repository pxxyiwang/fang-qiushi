<template>
	<view :style="{ height: statusBarHeight }" class="uni-status-bar">
		<slot />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	// #ifdef MP-WEIXIN
		var statusBarHeight = 0;
	// #endif
	export default {
		name: 'UniStatusBar',
		data() {
			return {
				statusBarHeight: statusBarHeight
			}
		}
	}
</script>

<style>
	.uni-status-bar {
		display: block;
		width: 100%;
		height: 20px;
		height: var(--status-bar-height);
	}
	
	/* 微信小程序uni-status-bar占位问题 */
	/* #ifdef MP-WEIXIN */
		view.uni-status-bar {
			height: 0;
		}
		.uni-status-bar {
			display: block;
			width: 100%;
			height: 0;
		}
	/* #endif */
</style>