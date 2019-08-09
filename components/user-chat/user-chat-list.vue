<template>
	<view>
		<template v-if="item.gstime">
			<view class="user-chat-time u-f-ajc">{{ item.gstime }}</view>
		</template>
		<view class="user-chat-list u-f" :class="{'user-chat-me': item.isme}">
			<template v-if="!item.isme">
				<image :src="item.userpic" mode="" lazy-load></image>
			</template>
			<view class="user-chat-list-body">
				<!-- 文字 -->
				<template v-if="item.type == 'text'">
					<text>{{ item.data }}</text>
				</template>
				<template v-if="item.type == 'img'">
					<!-- 图片 -->
					<image :src="item.data" mode=""></image>
				</template>
				
			</view>
			<template v-if="item.isme">
				<image :src="item.userpic" mode="" lazy-load></image>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		}
	}
</script>

<style scoped>
	/*  朋友 */
		.user-chat-list {
			padding: 20rpx 0;
		}
		.user-chat-list>image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			flex-shrink: 0;
		}
	.user-chat-list-body {
		 position: relative;
		 background: #f4f4f4;
		 padding: 25rpx;
		 margin-left: 20rpx;
		 border-radius: 20rpx;
		 margin-right: 100rpx;
	}
	.user-chat-list-body:after {
		 position: absolute;
		 left: -30rpx;
		 right: 0;
		 top: 30rpx;
		 content: '';
		 width: 0;
		 height: 0;
		 border: 16rpx solid #f4f4f4;
		 border-color: transparent #f4f4f4 transparent transparent;
	}
	.user-chat-list-body>image {
		 max-width: 150rpx;
		 max-height: 200rpx;
	}
	
	/* 自己 */
	.user-chat-me {
		 justify-content: flex-end;
	}
	.user-chat-me .user-chat-list-body {
		 margin-left: 100rpx;
		 margin-right: 20rpx;
	}
	.user-chat-me .user-chat-list-body:after {
		 left: auto;
		 right: -30rpx;
		 border-color: transparent transparent transparent #f4f4f4;
	}
</style>
