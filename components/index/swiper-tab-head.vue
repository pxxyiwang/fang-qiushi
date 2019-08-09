<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab" :style="scrollStyle">
			<block v-for="(item, index) in tabBars" :key="index">
				<view class="swiper-tab-list" :data-id="item.id" :class="{'active': tabIndex == index}" @tap="tabtap(index)" :style="scrollItemStyle">
					{{ item.name }} {{ item.num ? item.num : ''}}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			tabBars: Array,
			tabIndex: Number,
			scrollStyle: {
				tyel: String,
				default: ''
			},
			scrollItemStyle: {
				tyel: String,
				default: ''
			}
		},
		methods: {
			// tabber点击事件
			tabtap (index) {
				this.$emit('tabtap', index)
			}
		}
	}
</script>

<style scoped>
	.uni-swiper-tab {
		border-bottom: 1rpx solid #eee;
	}
	.swiper-tab-list {
		color: #969696;
		font-weight: bold;
	}
	.uni-tab-bar .active {
		color: #343434;
	}
	.active .swiper-tab-line {
		border-bottom: 6rpx solid #fede33;
		width: 70rpx;
		margin: auto;
		border-top: 6rpx solid #fede33;
		border-radius: 20rpx;
	}
	
</style>
