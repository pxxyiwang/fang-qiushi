<template>
	<view class="common-list u-f animated rotateIn fast">
		<view class="common-list-left">
			<image :src="item.userpic"></image>
		</view>
		
		<view class="common-list-right">
			<view>
				<view class="list-right-1 u-f-ac u-f-jsb">
					<view class="u-f-ac">
						{{ item.username }}
						
						<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
						
					</view>
					<view v-show="!item.isguanzhu" class="icon iconfont icon-zengjia" @tap="guanzhu">关注</view>	
				</view>
				
				<view class="common-list-right-time">26天前</view>
				
			</view>
			
			<view class="list-right-2">{{ item.title }}</view>
			<view class="list-right-3 u-f-ajc" style="flex-direction: column;">
				<block v-for="(pic, index) in item.morepic" :key="index">
					<!-- 图片 -->
					<image :src="pic" mode="" lazy-load @tap="imgdetail(index)" style="margin-bottom: 15rpx;"></image>
				</block>
				<template v-if="item.video">
					<!-- 视屏 -->
					<view class="common-list-play icon iconfont icon-bofang"></view>
					<view class="common-list-playinfo">
						20w 次播放 2:50
					</view>
				</template>
				<template v-if="item.share">
					<!-- 分享 -->
					<view class="common-list-share u-f-ac">
						<image :src="item.share.titlepic" mode="widthFix" lazy-load></image>
						<view>{{ item.share.title }}</view>
						
					</view>
				</template>
				
				
			</view>
			<view class="list-right-4 u-f-ac u-f-jsb">
				<view>{{ item.path }}</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-zhuanfa">{{ item.sharenum }}</view>
					<view class="icon iconfont icon-pinglun1">{{ item.commentnum }}</view>
					<view class="icon iconfont icon-dianzan1">{{ item.goodnum }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue";
	export default {
		components: {
			tagSexAge
		},
		props: {
			item: Object,
		},
		methods: {
			// 关注
			guanzhu () {
				// console.log(1111)
				this.$emit('guanzhu', this.index);
			},
			// 预览图片
			imgdetail (index) {
				uni.previewImage({
					current: index,
					urls: this.item.morepic
				})
			}
		}
	}
</script>

<style scoped>
	/* 关注 */
	@import "../../common/list.css";
	
	.common-list {
		border-bottom: 1rpx solid #eee;
	}
	.common-list-right {
		border-bottom: 0;
	}
	.common-list-right-time {
		padding: 15rpx 0;
		color: #ccc!important;
		font-size: 25rpx;
		background: #FFFFFF!important;
	}
	.common-list-right>view:nth-child(1)>view:nth-child(1)>view:first-child {
		color: #999;
		font-size: 32rpx;
	}
	.common-list-right>view:nth-child(1)>view:nth-child(1)>view:last-child {
		background: #eee;
		padding: 0 10rpx;
		font-size: 26rpx;
	}
</style>
