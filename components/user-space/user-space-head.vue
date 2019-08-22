<template>
	<view class="user-space-head u-f-ajc">
		<image :src="getBgimg" mode="" lazy-load @tap="changeBgimg"></image>
		<view class="user-space-head-info u-f-ajc u-f-column">
			<image :src="userinfo.userpic" mode="widthFix" lazy-load></image>
			<view class="user-space-margin u-f-ac">
				{{userinfo.userName}}
				<tag-sex-age :sex="userinfo.sex" :age="userinfo.age"></tag-sex-age>
			</view>
			<view class="icon iconfont user-space-head-btn user-space-margin" :class="[userinfo.isguanzhu ? 'active' : 'icon-zengjia']" @tap="gaunZhu">{{ userinfo.isguanzhu ? '已关注' : '关注'}}</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from '../../components/common/tag-sex-age.vue';

	export default {
		components: {
			tagSexAge,
		},
		props: {
			userinfo: Object
		},
		data() {
			return {
			}
		},
		computed: {
			getBgimg () {
				return '../../static/bgimg/' + this.userinfo.bgimg + '.jpg';
			}
		},
		methods: {
			// 切换背景
			changeBgimg () {
				this.$emit('changeBgimg');
			},
			// 是否关注
			gaunZhu () {
				this.$emit('gaunZhu');
			},
		}
	}
</script>

<style scoped>
	.user-space-head {
		position: relative;
		height: 500rpx;
		overflow: hidden;
	}
	.user-space-head>image {
		width: 100%;
	}
	.user-space-head-info {
		position: absolute;
		top: 150rpx;
	}
	.user-space-head-info>image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;
	}
	.user-space-head-info>view:first-of-type {
		color: #fff;
		font-size: 35rpx;
		font-weight: bold;
		text-shadow: 2rpx 2rpx 10rpx #333;
	}
	.user-space-head-btn {
		background: #ffe933;
		color: #333;
		border: 1rpx solid #ffe933;
		padding: 0 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
	.active {
		background: none;
		color: #fff;
		border: 1rpx solid #fff;
	}
</style>
