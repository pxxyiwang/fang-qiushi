<template>
	<view>
		<!-- 模糊背景 -->
		<view class="topic-bg">
			<image :src="topicInfo.titlepic" mode="widthFix" lazy-load></image>
		</view>
		
		<!-- 话题信息 -->
		<view class="topic-info">
			<view class="topic-info-t u-f-ac">
				<image :src="topicInfo.titlepic" mode="widthFix" lazy-load></image>
				<view>#{{ topicInfo.title }}#</view>
			</view>
			<view class="topic-info-c u-f-ac">
				<view>动态 {{ topicInfo.totalnum }}</view>
				<view>今日 {{ topicInfo.todaynum }}</view>
			</view>
			<view class="topic-info-b">
				{{ topicInfo.desc }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			topicInfo: Object
		}
	}
</script>

<style scoped>
	.topic-bg {
		 width: 100%;
		 height: 300rpx;
		 position: relative;
		 overflow: hidden;
	}
	.topic-bg image {
		 width: 100%;
		 position: absolute;
		 filter: blur(10px); // 背景模糊
	}
	.topic-info {
		 padding: 0 25rpx;
	}
	.topic-info-t {
		 position: relative;
	}
	.topic-info-t>image {
		 width: 150rpx;
		 height: 150rpx;
		 border-radius: 20rpx;
		 position: absolute;
		 top: -75rpx;
	}
	.topic-info-t>view {
		font-size:35rpx;
		margin-left: 170rpx;
		flex: 1;
	}
	.topic-info-c {
		 padding: 35rpx 0 10rpx 0;
	}
	.topic-info-c view {
		 color: #cdcdcd;
	}
	.topic-info-b {
		 color: #a3a3a3;
		 font-size: 32rpx;
		 padding-bottom: 10rpx;
	}
</style>
