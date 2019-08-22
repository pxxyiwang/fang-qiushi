<template>
	<view class="user-space-data">
		<view class="user-space-data-item">
			<view>账号信息</view>
			<view>糗龄： {{ getRegAge }}</view>
			<view>糗百ID：{{ dataList.id }}</view>
		</view>
		<view class="user-space-data-item">
			<view>个人信息</view>
			<view>星座： {{ getXingZuo }}</view>
			<view>职业：{{ dataList.job }}</view>
			<view>故乡：{{ dataList.path }}</view>
			<view>情感：{{ dataList.qg }}</view>
		</view>
	</view>
</template>

<script>
	import time from '../../common/time.js'
	
	export default {
		props: {
			dataList: Object
		},
		computed: {
			getRegAge () {
				return time.gettime.sumAge(this.dataList.regTime);
			},
			getXingZuo () {
				return time.gettime.getHoroscope(this.dataList.birthday);
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.user-space-data {
		padding: 0 30rpx;
	}
	.user-space-data-item {
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
	}
	.user-space-data-item>view {
		color: #aaa;
	}
	.user-space-data-item>view:first-child {
		color: #333;
		font-size: 35rpx;
		padding: 15rpx 0;
	}
</style>
