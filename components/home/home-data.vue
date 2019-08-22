<template>
	<view class="home-data u-f-ac">
		<block v-for="(item, index) in dataList" :key="index">
			<view class="u-f1 u-f-ajc u-f-column">
				<view>{{ item.num }}</view>
				{{ item.name }}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: Array
		}
	}
</script>

<style scoped>
	.home-data {
		padding: 20rpx 40rpx;
		}
	.home-data>view {
		color: #989898;
	}
	.home-data>view>view {
		font-size: 32rpx;
		color: #333;
	}
	.home-adv {
		padding: 20rpx;
	}
	.home-adv>image {
		border-radius: 20%;
		height: 150rpx;
	}
</style>
