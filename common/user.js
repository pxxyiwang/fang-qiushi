import $http from './request.js';
export default {
	// 用户的token
	// ebd27046602b58f66eb337df7dcececda793e92b
	token: "ebd27046602b58f66eb337df7dcececda793e92b",
	// 用户信息
	userinfo: false,
	__init () {
		// 获取用户信息
		this.userinfo = uni.getStorageSync("userinfo");
		console.log(2222);
		console.log(this.userinfo);
		this.token = uni.getStorageSync("token");
	},
	// 权限验证跳转
	navigate (option, type = "navigateTo") {
		// 权限验证
/* 		if (!this.token) {
			return uni.navigateTo({
				url: '/pages/login/login'
			});
		} */
		console.log(option);
		// 跳转
		switch (type) {
			case "navigateTo":
				uni.navigateTo(
					option
				);
				break;
			case "redirectTo":
				uni.redirectTo(
					option
				);
				break;
			case "reLaunch":
				uni.reLaunch(
					option
				);
				break;
			case "switchTab":
				uni.switchTab(
					option
				);
				break;
			case "navigateBack":
				uni.navigateBack(
					option
				);
				break;
		}
		
	},
	// 登录
	async login (options = {}) {
		// 请求登录
		let [err, res] = await $http.post(options.url, options.data);
		console.lgo(err, res)
		// 登陆失败
		if (!$http.errorCheck(err, res)) return false;
		// 登录成功 保存状态
		this.token = res.data.token;
		this.userinfo = this.__formatUserinfo(res.data.data);
		// 本地存储
		console.log(1111);
		console.log(this.userinfo);
		uni.setStorageSync("userinfo", this.userinfo);
		uni.setStorageSync("token", this.token);
		// 获取用户相关统计
		// await this.getCounts();
		// 连接socket
		// 成功提示
		uni.showToast({title: '登录成功'});
		// 返回上一步
		if (!options.Noback) {
			uni.navigateBack({delta: 1});
		}
		return true;
	},
	// userinfo格式转换
	__formatUserinfo(obj){
		// 手机/邮箱/账号登录
		console.log(333);
		console.log(obj);
		if (obj.logintype == "username" || obj.logintype == "email" || obj.logintype == "phone") {
			// 设置默认头像
			obj.userpic = obj.userpic || "https://krplus-pic.b0.upaiyun.com/avatar/201812/28095646/fde0v5pcswzft2s8!120";
			return obj;
		}
		// 第三方登录（已绑定）
		if (obj.user && obj.user_id > 0) {
			return {
				id: obj.user.id,
				username: obj.user.username || obj.nickname,
				userpic: obj.user.userpic || obj.avatarurl,
				phone: obj.user.phone,
				email: obj.user.email,
				status: obj.user.status,
				create_time: obj.user.create_time,
				logintype: obj.logintype,
				password:obj.user.password,
				token: obj.token,
				userinfo: {
				    id: obj.user.userinfo.id,
				    user_id: obj.user.userinfo.user_id,
				    age: obj.user.userinfo.age,
				    sex: obj.user.userinfo.sex,
				    qg: obj.user.userinfo.qg,
				    job: obj.user.userinfo.job,
				    path: obj.user.userinfo.path,
				    birthday: obj.user.userinfo.birthday,
				}
			}
		}
		// 第三方登录（未绑定）
		return {
			id: obj.user_id,
			username: obj.nickname,
			userpic: obj.avatarurl,
			phone: false,
			email: false,
			status: 1,
			create_time: false,
			logintype: obj.logintype,
			token: obj.token,
			userinfo: false
		}
	}
}