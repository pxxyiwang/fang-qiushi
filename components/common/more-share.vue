<template>
	<view>
		<!-- 分享 -->
		<view class="more-share-model animated fadeIn dast" v-if="shareshow" @tap="togle"></view>
		<view class="more-share"  v-if="shareshow">
			<view class="more-share-title">分享到</view>
			<scroll-view scroll-x class="more-shaare-body u-f-ajc">
				
				<block v-for="(item, index) in providerList" :key="index">
					<view class="more-share-item">
						<view class="icon iconfont u-f-ajc" :class="['icon-' + item.zicon, 'more-share-' + item.zclass]" hover-class="more-share-hover" @tap="share(item)"></view>
						<view>{{item.name}}</view>
					</view>
				</block>
				
			</scroll-view>
			<view class="more-share-bottom" hover-class="more-share-hover" @tap="togle">取消</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			shareshow: Boolean,
			sharedata: Object
		},
		data() {
			return {
				title: '',
				shareText: '',
				href:"",
				image: '',
				shareType:1, // 1文字  2图片  0图文  5小程序  
				providerList: []
			}
		},
		watch: {
			sharedata(newValue, oldValue) {
				this.title = newValue.title;
				this.shareText = newValue.content;
				this.href = newValue.url;
				this.image = newValue.titlepic;
				this.shareType = newValue.shareType;
				
			}
		},
		// mounted() {
		// 	this.onload();
		// },
		// 在H5端中，目前自定义组件中onLoad方法目前还不支持，暂时只能先用vue中的created或者mounted方法或者将使用哦那onReady()。onload目前只在vue文件的页面。
		// onLoad() {
		onReady() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信',
									id: 'weixin',
									zicon: "weixin",
									zclass: "wx",
									sort:0
								})
								data.push({
									name: '朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									zicon: "weixin",
									zclass: "pyq",
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo',
									zicon: "xinlangweibo",
									zclass: "wb",
									sort:2
								})
								break;
							case 'qq':
								data.push({
									name: 'QQ好友',
									id: 'qq',
									zicon: "QQ",
									zclass: "QQ",
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		},
		methods: {
			// 分享显示与隐藏
			togle () {
				this.$emit('togle');
			},
			async share(e) {
				console.log('分享通道:'+ e.id +'； 分享类型:' + this.shareType);
				
				if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
					uni.showModal({
						content:'分享内容不能为空',
						showCancel:false
					})
					return;
				}
				
				if(!this.image && (this.shareType === 2 || this.shareType === 0)){
					uni.showModal({
						content:'分享图片不能为空',
						showCancel:false
					})
					return;
				}
				
				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '分享成功',
							showCancel:false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel:false
						})
					},
					complete:function(){
						console.log('分享操作结束!')
					}
				}
				
				switch (this.shareType){
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = this.title;
						shareOPtions.href = this.href;
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = this.title;
						shareOPtions.miniProgram = {
							id:'gh_33446d7f7a26',
							path:'/pages/tabBar/component/component',
							webUrl:'https://uniapp.dcloud.io',
							type:0
						};
						break;
					default:
						break;
				}
				
				if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				
				if (shareOPtions.provider === 'sinaweibo') {//如果是分享文字到新浪微博
					shareOPtions.type = 1;
					shareOPtions.imageUrl = '';
				}
				
				if (shareOPtions.provider === 'qq') {//如果是分享文字到qq，则必须加上href和title
					shareOPtions.type = 1;
					shareOPtions.href = this.href;
					shareOPtions.title = this.title;
				}
				uni.share(shareOPtions);
			},
			compress (){//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					});
				})
			},
			// 动态加载分享选项
			onload () {
				uni.getProvider({
					service: 'share',
					success: (e) => {
						let data = []
						for (let i = 0; i < e.provider.length; i++) {
							switch (e.provider[i]) {
								case 'weixin':
									data.push({
										name: '微信',
										id: 'weixin',
										zicon: "weixin",
										zclass: "wx",
										sort:0
									})
									data.push({
										name: '朋友圈',
										id: 'weixin',
										type:'WXSenceTimeline',
										zicon: "weixin",
										zclass: "pyq",
										sort:1
									})
									break;
								case 'sinaweibo':
									data.push({
										name: '新浪微博',
										id: 'sinaweibo',
										zicon: "xinlangweibo",
										zclass: "wb",
										sort:2
									})
									break;
								case 'qq':
									data.push({
										name: 'QQ好友',
										id: 'qq',
										zicon: "weixin",
										zclass: "qq",
										sort:3
									})
									break;
								default:
									break;
							}
						}
						this.providerList = data.sort((x,y) => {
							return x.sort - y.sort
						});
					},
					fail: (e) => {
						console.log('获取分享通道失败', e);
						uni.showModal({
							content:'获取分享通道失败',
							showCancel:false
						})
					}
				});
			}
		}
	}
</script>

<style scoped>
	/* 分享 */
	.more-share-model {
		background: rgba(51, 51, 51, 0.49);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
	.more-share {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 110;
	}
	.more-share-hover {
		background: #eee;
	}
	.more-share-title, .more-share-bottom {
		font-size: 32rpx;
		padding: 25rpx;
		text-align: center;
	}
	.more-share-body {
		display: flex;
		white-space: nowrap;
		width: 100%;
		height: 200rpx;
		border-bottom: 1rpx solid #eee;
		line-height: 200rpx;
	}
	.more-share-item {
		width: 25%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
	}
	.more-share-item>view:first-child {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		font-size: 55rpx;
		color: #fff;
	}
	.more-share-item>view:last-child {
		color: #7a7a7a;
	}
	.more-share-wx {
		background: #2ad19b;
	}
	.more-share-pyq {
		background: #514d4c;
	}
	.more-share-wb {
		background: #ee5e5e;
	}
	.more-share-qq {
		background: #4a73ba;
	}
</style>
