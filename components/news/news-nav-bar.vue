<template>
	<view>
		<uni-nav-bar :fixed="true" :statusBar="true" :border="false" @click-right="openAdd">
			
			<!-- 左边 -->
			<block slot="left">
				<view class="nav-left u-f-ajc">
					<view class="icon iconfont icon-qiandao"></view>
				</view>
			</block>
			<!-- 中间 -->
			<view class="nav-tab-bar u-f-ajc">
				<block v-for="(tab, index) in tabBars" :key="tab.id">
					<view class="u-f-ajc" :class="{'active': tabIndex == index}" @tap="changeTab(index)">
						{{ tab.name }}
						<view v-if="(tabIndex == index)" class="nav-tab-bar-line"></view>
					</view>
				</block>
			</view>
			<!-- 右边 -->
			<block slot="right">
				<view class="nav-right u-f-ajc">
					<view class="icon iconfont icon-bianji1"></view>
				</view>
			</block>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		props: {
			tabIndex: Number,
			tabBars: Array
		},
		methods: {
			// 导航栏内容切换
			changeTab (index) {
				this.$emit('changeTab', index);
			},
			// 跳转发布
			openAdd () {
				uni.navigateTo({
					url: '../add-input/add-input'
				});
			}
		}
	}
</script>

<style scoped>
	.nav-left, .nav-right {
		height: 100%;
	}
	.nav-left>view, .nav-right>view {
		font-size: 40rpx;
	}
	.nav-left>view {
		color: #ff9616;
	}
	.nav-left {
		margin-left: 16rpx;
	}
	.nav-right {
		width: 100%;
	}
	.nav-tab-bar {
		/* border: 1rpx solid; */
		width: 100%;
		margin-left: -25rpx;
		height: 100%;
		position: relative;
	}
	.nav-tab-bar>view {
		font-size: 32rpx;
		padding: 0 15rpx;
		font-weight: bold;
		color: #969696;
	}
	.active {
		color: #333!important;
	}
	.nav-tab-bar-line {
		border-bottom: 5rpx solid #fede33;
		border-top: 5rpx solid #fede33;
		width: 70rpx;
		border-radius: 20rpx;
		position: absolute;
		bottom: 12rpx;
	}
</style>
