<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar :statusBar="true" rightText="发布" left-icon="back" @click-left="back" @click-right="sunbmit">
			<view class="u-f-ajc title" @tap="changelook">
				{{yinsi}}
				
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uni-nav-bar>
		
		<!-- 多行时输入框 -->
		<view class="uni-textarea">
			<textarea value="" placeholder="说一句话" v-model="text" />
		</view>
		
		<!-- 上传多图 -->
		<upload-images @upload="upload"></upload-images>
	
		<!-- 弹出公告 -->
		<uni-popup :show="showpopup" position="middle" mode="fixed" @hidePopup="hidePopup">
			<view class="gonggao">
				<view class="u-f-ajc">
					<image src="../../static/common/addinput.png" mode="widthFix"></image>
				</view>
				<view>1.涉及黄色、政治、广告及骚扰信息</view>
				<view>2.涉及黄色、政治、广告及骚扰信息</view>
				<view>4.涉及黄色、政治、广告及骚扰信息</view>
				<button type="default" @tap="hidePopup">朕知道了</button>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uploadImages from "../../components/common/upload-images.vue"
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	
	let changelook = ['所有人可见', '仅自己可见'];

	export default {
		components: {
			uniNavBar,
			uploadImages,
			uniPopup
		},
		data() {
			return {
				yinsi: '所有人可见',
				text: '',
				imglist: [],
				// 弹出公告参数
				showpopup: true,
				isget: false
			}
		},
		onBackPress () {
			// 如果用户有输入值猜才保存
			if (!this.text && this.imglist.length < 1) { return; }
			if (!this.isget) {
				this.baocun();
				return true;
			}
			
		},
		methods: {
			// 返回
			back () {
				uni.navigateBack({
					delta: 1
				});
			},
			// 发布
			sunbmit (){
				console.log("fabu");
			},
			// 下拉框(隐私)
			changelook () {
				uni.showActionSheet({
					itemList: changelook,
					success: (res) => {
							this.yinsi = changelook[res.tapIndex];
					}
				});
			},
			// 上传图片
			upload (arr) {
				this.imglist = arr;
				console.log(this.imglist);
			},
			// 隐藏弹出公告
			hidePopup () {
				this.showpopup = false;
			},
			// 保存为草稿
			baocun () {
				uni.showModal({
					content: '是否要保存为草稿？',
					canceltext: '不保存',
					sonfirmtext: '保存',
					success: (res) => {
						if (res.confirm) {
							console.log('保存');
						} else {
							console.log('不保存');
						}
						this.isget = true;
						uni.navigateBack({
							delta: 1
						})
					}
				});
			}
		}
	}
</script>

<style scoped>
	.title {
		height: 100%;
		margin-left: -25rpx;
	}
	.uni-textarea {
		color: 1rpx solid #eee;
	}
	/* 公告 */
	.gonggao {
		width: 500rpx;
	}
	.gonggao image {
		width: 75%;
		margin-bottom: 20rpx;
	}
	.gonggao button {
		background: #ffe934;
		color: #fff;
		margin-top: 20rpx;
	}
	
</style>
