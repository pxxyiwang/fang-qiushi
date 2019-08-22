<template>
	<view class="home-list-item u-f-ac u-f-jsb"  hover-class="home-list-hover" @tap="clickevent">
		<view class="u-f-ac">
			<view v-if="item.icon" class="icon iconfont" :class="['icon-' + item.icon]"></view>
			{{ item.name }}
		</view>
		<view class="icon iconfont icon-jinru"></view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			clickevent () {
				switch (this.item.clickType){
					case "navigateTo":
						if (this.item.url) {
							uni.navigateTo({
								url: this.item.url
							})
						}
						break;
					case "switchTab":
						if (this.item.url) {
							uni.switchTab({
								url: this.item.url
							})
						}
						break;
					case "clear":
						uni.showModal({
							title: '提示',
							content: '是否要清除缓存？',
							confirmText: '立刻清除',
							success: res => {
								if (res.confirm) {
									uni.clearStorage();
									uni.showToast({
										title: '清除缓存成功！'
									})
								}
							}
						})
						break;
				}
			}
		}
	}
</script>

<style scoped>
	/* 列表 */
	.home-list-hover {
		background: #eee;
	}
	.home-list-item {
		padding: 20rpx;
		border-top: 1rpx solid #f4f4f4;
		border-bottom: 1rpx solid #f4f4f4;
	}
	.home-list-item>view:first-child {
		color: #333;
	}
	.home-list-item>view:first-child>view {
		margin-right: 10rpx;
	}
	.home-list-item>view:last-child {
		color: #ccc;	
	}
	
</style>
