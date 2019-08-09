<template>
	<view class="common-list u-f animated rotateIn fast">
		<view class="common-list-left">
			<image :src="item.userpic"></image>
		</view>
		
		<view class="common-list-right">
			<view class="list-right-1 u-f-ac u-f-jsb">
				<view class="u-f-ac">
					{{ item.username }}
					
					<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
					
				</view>
					<view v-show="!item.isguanzhu" class="icon iconfont icon-zengjia" @tap="guanzhu">关注</view>
			</view>
			<view class="list-right-2">{{ item.title }}</view>
			<view class="list-right-3 u-f-ajc">
				<!-- 图片 -->
				<image v-show="item.titlepic" :src="item.titlepic" mode="widthFix" lazy-load></image>
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
	import tagSexAge from "./tag-sex-age.vue";
	export default {
		components: {
			tagSexAge
		},
		props: {
			item: Object,
			index: Number
		},
		methods: {
			// 关注
			guanzhu () {
				this.$emit('guanzhu', this.index);
			}
		}
	}
</script>

<style scoped>
	/* 关注 */
	@import "../../common/list.css";
</style>
