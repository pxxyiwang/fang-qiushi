<template>
	<!-- 输入框 -->
	<view class="user-chat-bottom u-f-ac">
		<input type="text" placeholder="文明发言" v-model="text"> 
		<view class="icon iconfont icon-fabu" @tap="submit"></view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				text: ''
			}
		},
		methods: {
			// 发送
			submit () {
				this.$emit('submit', this.text);
				this.text = '';
			}
		}
	}
</script>

<style scoped>
	.user-chat-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2;
		padding: 10rpx 20rpx;
		background: #fff;
		border-top: 1rpx solid #eee;
	}
	.user-chat-bottom>input {
		flex: 1;
		margin-right: 20rpx;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		background: #f7f7f7;
	}
	.user-chat-bottom>view {
		width: 80rpx;
		font-size: 45rpx;
		
	}
</style>
