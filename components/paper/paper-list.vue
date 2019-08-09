<template>
	<view class="paper-list u-f-ac animated rotateIn fast" @tap="openDetail">
		<image :src="item.userpic" mode="widthFix" lazy-load></image>
		<view class="">
			<view class="u-f-ac u-f-jsb">
				{{ item.username }}
				<view>{{ item.time}}</view>
			</view>
			<view class="u-f-ac u-f-jsb">
				{{ item.dada}}
				<template v-if="item.noreadnum > 0">
					<uni-badge :text="item.noreadnum" type="error" />
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "../../components/uni-badge/uni-badge.vue";

	export default {
		components: {
			uniBadge
		},
		props: {
			item: Object,
			index: Number
		},
		methods: {
			// 点击好友跳转聊天页面
			openDetail () {
				uni.navigateTo({
					url: '../../pages/user-chat/user-chat'
				})
			}
		}
	}
</script>

<style scoped>
	.paper-list {
		border-bottom: 1rpx solid #eee;
		padding: 20rpx 0;
	}
	.paper-list>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	.paper-list>view {
		flex: 1;
	}
	.paper-list>view>view:first-child {
		font-size: 35rpx;
	}
	.paper-list>view>view:first-child>view {
		color: #cbcbcb;
	}
	.paper-list>view>view:last-child {
		color: #999;
	}
</style>
