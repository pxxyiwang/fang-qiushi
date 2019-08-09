<template>
	<view>
		<!-- 操作菜单 -->
		<view class="paper-left-popup-mask" v-show="show" @tap="hidepopup"></view>
		<view class="paper-left-popup" v-show="show">
			<view class="u-f-ac" hover-class="paper-left-popup-h" @tap="addfriend">
				<view class="icon iconfont icon-sousuo"></view>
				加糗友
			</view>
			<view class="u-f-ac" hover-class="paper-left-popup-h" @tap="clear">
				<view class="icon iconfont icon-qingchu"></view>
				清除缓存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: Boolean
		},
		methods: {
			// 操作菜单
			addfriend () {
				this.$emit('addfriend');
			},
			// 清除事件
			clear () {
				this.$emit('clear');
			},
			// 隐藏popup
			hidepopup () {
				this.$emit('hidepopup');
			},
			// 显示popup
			showpopup () {
				this.$emit('showpopup');
			}
		}
	}
</script>

<style scoped>
	/* 操作菜单 */
	.paper-left-popup-mask {
		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 1999;
	}
	.paper-left-popup {
		position: fixed;
		right: 0;
		/* top: 10rpx; */
		
		background: #fff;
		z-index: 2000;
		width: 55%;
		box-shadow: 1rpx 1rpx 20rpx 2rpx #cccccc;  /* 阴影*/
	}
	.paper-left-popup>view {
		padding: 20rpx;
		font-size: 35rpx;
	}
	.paper-left-popup>view>view {
		margin-right: 10rpx;
		font-weight: bold;
	}
	.paper-left-popup-h {
		background: #eee;
	}
</style>
