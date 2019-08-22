<template>
	<!-- 第三方登陆 -->
	<view class="other-login u-f-ac">
		<block v-for="(item, index) in providerList" :key="index">
			<view class="u-f-ajc u-f1" @tap="toLogin(item)">
				<view class="icon iconfont u-f-ajc" :class="['icon-' + item.icon]"></view>
			</view>
		</block>
		<!-- <view class="u-f-ajc u-f1">
			<view class="icon iconfont icon-weixin u-f-ajc"></view>
		</view>
		
		<view class="u-f-ajc u-f1">
			<view class="icon iconfont icon-QQ u-f-ajc"></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: []
			}
		},
		// mounted() { // app端支持
		// 	this.getLoginAuth();
		// },
		// 在H5端中，目前自定义组件中onLoad方法目前还不支持，暂时只能先用vue中的created或者mounted方法。onload目前只在vue文件的页面,但是还可使用onReady(),也可以生效。
		// onLoad() { // app端也无效
		onReady() {
			this.getLoginAuth();
		},
		methods: {
			// 获取当前登录渠道
			getLoginAuth () {
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = '';
							let icon = '';
							switch (value) {
								case 'weixin':
									providerName = '微信登录'
									icon = 'weixin';
									break;
								case 'qq':
									providerName = 'QQ登录'
									icon = 'QQ';
									break;
								case 'sinaweibo':
									providerName = '新浪微博登录'
									icon = 'xinlangweibo';
									break;
								case 'alipay':
									providerName = '支付宝登录'
									icon = '';
									break;
							}
							return {
								name: providerName,
								id: value,
								icon: icon
							}
						});
						console.log(this.providerList);
					},
					fail: (error) => {
						console.log('获取登录通道失败', error);
					}
				});
			},
			// 登录
			toLogin (provider) {
				uni.login({
					provider: provider.id,
				            // #ifdef MP-ALIPAY
				            scopes: 'auth_user',  //支付宝小程序需设置授权类型
				            // #endif
					success: (res) => {
						console.log('login success:', res);
						// 更新保存在 store 中的登录状态
						// this.login(provider.id);
						console.log('登录成功，保存到本地存储，修改当前用户登录状态')
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.other-login {
			padding: 25rpx 80rpx;
		}
	.other-login>view>view {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		font-size: 55rpx;
		color: #fff;
	}
	.other-login .icon-QQ {
		background: #2caefc;
	}
	.other-login .icon-weixin {
		background: #2bd19b;
	}
	.other-login .icon-xinlangweibo {
		background: #fc7729;
	}
	
	
</style>
