<template>
	<view class="body">
		<input type="text" class="uni-input common-input" placeholder="输入需要绑定的邮箱" v-model="email">
		<input type="text" class="uni-input common-input" placeholder="请输入密码" v-model="password" password>
		<button class="user-set-btn" :loading="loading" :class="{'user-set-btn-disable': disable}" :disabled="disable" type="primary" @tap="submit">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				disable: true,
				loading: false
			}
		},
		watch: {
			email (val) {
				this.change();
			},
			password (val) {
				this.change();
			},
		},
		methods: {
			// 监听输入框
			change () {
				if (this.email && this.password) {
					this.disable = false;
					return;
				}
				this.disable = true;
			},
			// 验证
			check () {
				if (this.email && this.password && this.email != "" && this.password != "") {	
					
					// 验证邮箱格式
					let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					
					if (!pattern.test(this.email)) {
						uni.showToast({
							title: '请输入正确的邮箱格式',
							icon: 'none'
						});
						return false;
					}
					return true;
				}
				
				uni.showToast({
					title: '请确认数据填写完整',
					icon: "none"
				})
				
				return false;
				
			},
			// 提交
			submit () {
				
				this.loading = true;
				this.disable = true;
				
				if (!this.check()) {
					this.loading = false;
					this.disable = false;
					return;
				}
				uni.showToast({
					title: '验证通过',
					mask: false,
					duration: 1500
				});
				this.loading = false;
				this.disable = false;
			}
		}
	}
</script>

<style scoped>
	@import "../../common/form.css";
</style>
