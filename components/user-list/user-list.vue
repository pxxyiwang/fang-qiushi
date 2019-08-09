<template>
	<view class="user-list u-f-ac animated rotateIn fast">
		<image :src="item.userpic" mode=""></image>
		<view class="">
			<view>{{ item.username}}</view>
			<view style="display: inline-block;">
				<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
			</view>
		</view>
		<view class="icon iconfont" :class="[item.isguanzhu ? 'icon-xuanze-yixuan' : 'icon-zengjia1']"></view>
	</view>
</template>

<script>
	import tagSexAge from '../../components/common/tag-sex-age.vue';

	export default {
		components: {
			tagSexAge
		},
		props: {
			item: Object,
			index: Number,
			itemIndex: Number
		}
	}
</script>

<style scoped>
	.user-list {
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
	}
	.user-list>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	.user-list>view:first-of-type {
		flex: 1;
	}
	.user-list>view:first-of-type>view {
		font-size: 35rpx;
	}
	.user-list>view:last-of-type {
		width: 80rpx;
		color: #ccc;
	}
	.icon-zengjia1 {
		color: #f87918!important;
	}
</style>
