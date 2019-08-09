<template>
	<view>
		<block v-for="(item, index) in comment.list" :key="index">
			<view class="uni-comment-list" :class="{'uni-comment-list-child': (item.fid > 0)}">
				<view class="uni-comment-face"><image :src="item.userpic" mode="widthFix" lazy-load></image></view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>{{ item.username }}</text>
					</view>
					<view class="uni-comment-date">
						<text>{{ item.time }}</text>
					</view>
					<view class="uni-comment-content">{{ item.data }}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			comment: Object
		}
	}
</script>

<style scoped>
	.uni-comment-list-child {
		background: #F4F4F4;
		padding: 20rpx;
	 /* 超出部分不会向外扩张，而是会向里面挤 */
		box-sizing: border-box;
		margin: 0;
		margin-left: 70rpx;
		width: auto;
	}
</style>
