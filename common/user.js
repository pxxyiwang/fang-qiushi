export default {
	// 用户的token
	token: "ebd27046602b58f66eb337df7dcececda793e92b",
	// 用户信息
	userinfo: false,
	// 权限验证跳转
	navigate (option, tyep = "navigateTo") {
		// 权限验证
		if (!this.token) {
			return uni.navigateTo({
				url: '/pages/login/login'
			});
		}
		
		// 跳转
		switch (type) {
			case "navigateTo":
				uni.navigateTo({
					option
				});
				break;
			case "redirectTo":
				uni.redirectTo({
					option
				});
				break;
			case "reLaunch":
				uni.reLaunch({
					option
				});
				break;
			case "switchTab":
				uni.switchTab({
					option
				});
				break;
			case "navigateBack":
				uni.navigateBack({
					option
				});
				break;
		}
		
	}
}