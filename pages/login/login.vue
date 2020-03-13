<template>
	<view>
		<!-- 状态栏 导航栏占位 -->
		<uni-status-bar bgcolor="#ffe933"></uni-status-bar>
		
		<!-- 关闭按钮 -->
		<view class="icon iconfont icon-guanbi" @tap="back"></view>
		<!-- 引入背景图 -->
		<image class="loginHead" src="../../static/common/loginhead.png" mode="widthFix" lazy-load></image>
		
		<!-- 输入框 + 按钮 -->
		<view class="login-padding" style="padding: 20rpx;">
			
			<!-- 账号密码登录 -->
			<template v-if="!status">
				<input type="text" class="uni-input common-input" placeholder="昵称/手机号/邮箱" v-model="userName">
				
				<view class="login-inout-box">
					<input type="text" class="uni-input common-input" placeholder="请输入密码"  v-model="password" password>
					<view class="forget u-f-ajc login-font-color">忘记密码</view>
				</view>
			</template>
			
			<!-- 手机验证登录 -->
			<template v-else>
				<view class="login-inout-box">
					<view class="phone u-f-ajc">+86</view>
					<input type="text" class="uni-input common-input phone-input" placeholder="请输入手机号" v-model="phone">
				</view>
				
				<view class="login-inout-box">
					<input type="text" class="uni-input common-input" placeholder="请输入验证码" v-model="checkNum">
					<view class="forget u-f-ajc login-font-color yanzhengma" @tap="getCheckNum">
						<view class="u-f-ajc">{{ !codetime ? '获取验证码' : codetime + ' s'}}</view>
					</view>
				</view>
			</template>
			
			
			<button class="user-set-btn" :loading="loading" :class="{'user-set-btn-disable': disable}" :disabled="disable" type="primary" @tap="submit">登录</button>
		</view>
		
		<!-- 登录状态切换 -->
		<view class="login-status u-f-ajc login-padding login-font-color" @tap="changeStatus">
			{{ status ? '账号密码登录' : '验证码的登录' }}
			<view class="icon iconfont icon-jinru"></view>
		</view>
		
		<!-- 第三方登录 -->
		<view class="other-login-title u-f-ajc login-padding login-font-color">第三方登录</view>
		<other-login></other-login>
		
		<!-- 协议 -->
		<view class="login-rule u-f-ajc login-padding login-font-color">
			注册即代表你同意<view>《xxx协议》</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue';
	import otherLogin from '../../components/home/other-login.vue';
	export default {
		components: {
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				status: false, // false 代表账号密码登录， true 代表手机验证码登录
				disable: true,
				loading: false,
				userName: '',
				password: '',
				phone: '',
				checkNum: '',
				codetime: 0
			}
		},
		watch: {
			userName (val) {
				this.onBtnChange();
			},
			password (val) {
				this.onBtnChange();
			},
			phone (val) {
				this.onBtnChange();
			},
			checkNum (val) {
				this.onBtnChange();
			}
		},
		methods: {
			// 判断用户是否登录
			isLogin(){
				if (!this.User.token){
					this.loginStatus = false;
					this.homeinfo={
						userpic:"",
						username:"",
						totalnum:0,
						todaynum:0,
					};
					this.homedata[0].num = 0;
					this.homedata[1].num = 0;
					this.homedata[2].num = 0;
					this.homedata[3].num = 0;
					return;
				}
				// 用户已登录
				this.homeinfo.id = this.User.userinfo.id;
				this.homeinfo.userpic = this.User.userinfo.userpic;
				this.homeinfo.username = this.User.userinfo.username;
				this.homeinfo.totalnum = this.User.counts.post_count || 0;
				this.homeinfo.todaynum = this.User.counts.today_posts_count || 0;
				this.homedata[0].num = this.User.counts.post_count || 0;
				this.homedata[1].num = this.User.counts.post_count || 0;
				this.homedata[2].num = this.User.counts.comments_count || 0;
				this.homedata[3].num = this.User.counts.withfen_count || 0;
				this.loginStatus = true;
			},
			// 返回上一步
			back () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 初始化表单
			initInput () {
				this.userName = '';
				this.password = '';
				this.phone = '';
				this.checkNum = '';
			},
			// 切换登录状态
			changeStatus () {
				// console.log(4444);
				this.initInput();
				this.status = !this.status;
				console.log(status)
			},
			// 改变按钮的状态
			onBtnChange () {
				if ((this.userName && this.password) || (this.phone && this.checkNum)) {
					this.disable = false;
					return;
				}
				this.disable = true;
			},
			// 验证手机号码合法性
			isPhone () {
				// 验证手机合法性
				let mPattern = /^1[34578]\d{9}$/;
				return mPattern.test(this.phone);
			},
			// 获取验证码
			getCheckNum () {
				if (this.codetime > 0) {
					uni.showToast({
						title: '不能重复获取',
						icon: 'none'
					})
					return;
				}
				
				// 验证手机合法性
				if(!this.isPhone()) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return;
				}
				
				// 请求服务器，发送验证码
				// 发送成功，开启倒计时
				this.codetime = 60;
				let timer = setInterval(() => {
					this.codetime--;
					if(this.codetime < 1) {
						clearInterval(timer);
						this.codetime = 0;
					}
				}, 1000);
			}, 
			// 登录
			submit () {
				// 账号密码登录
				if (!this.status) {
					return this.user.login({
						url: "/user/login",
						data: {
							username: this.userName,
							password: this.password
						}
					});
				}
				// 验证码登录
				// 验证手机登录
				if(!this.isPhone()) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return;
				}
			}
		}
	}
</script>

<style scoped>
	@import "../../common/form.css";
	
	.login-padding {
		padding: 20rpx 0;
	}
	.login-font-color {
		color: #bbb;
	}
	
	.icon-guanbi {
		position: fixed;
		top: 60rpx;
		left: 30rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #332f0a;
	}
	/* #ifdef H5 */
	.icon-guanbi {
		z-index: 100;
	}
	/* #endif */
	.loginHead {
		width: 100%;
	}
	.other-login-title {
		position: relative;
	}
	.other-login-title:before, .other-login-title:after {
		position: absolute;
		background: #bbb;
		height: 1rpx;
		width: 100rpx;
		top: 50%;
		content: "";
	}
	.other-login-title:before {
		left: 25%;
	}
	.other-login-title:after {
		right: 25%;
	}
	
	.login-inout-box {
		position: relative;
	}
	.login-inout-box .forget-input {
		padding-right: 160rpx;
	}
	.login-inout-box .forget, .login-inout-box .phone {
		position: absolute;
		top: 0;
		height: 100%;
	}
	.login-inout-box .forget {
		width: 160rpx;
		right: 0;
	}
	.login-inout-box .phone-input {
		padding-left: 100rpx;
	}
	.login-inout-box .phone {
		width: 100rpx;
		font-weight: bold;
		left:0;
	}
	.yanzhengma view {
		background: #eee;
		border-radius: 15rpx;
		font-size: 25rpx;
		padding: 0 5rpx;
		width: 160rpx;
		padding: 8rpx 0;
	}
</style>
