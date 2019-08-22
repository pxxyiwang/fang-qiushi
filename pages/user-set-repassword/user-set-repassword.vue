<template>
	<view class="body">
		<input type="text" class="uni-input common-input" placeholder="输入新密码" v-model="oldPassword" password>
		<input type="text" class="uni-input common-input" placeholder="输入旧密码" v-model="newPassword" password>
		<input type="text" class="uni-input common-input" placeholder="确认新密码" v-model="renewPassword" password>
		<button class="user-set-btn" :loading="loading" :class="{'user-set-btn-disable': disable}" :disabled="disable" type="primary" @tap="submit">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				renewPassword: '',
				disable: true,
				loading: false
			}
		},
		watch: {
			oldPassword (val) {
				this.change();
			},
			newPassword (val) {
				this.change();
			},
			renewPassword (val) {
				this.change();
			}
		},
		methods: {
			// 监听输入框
			change () {
				if (this.oldPassword && this.newPassword && this.renewPassword) {
					this.disable = false;
					return;
				}
				this.disable = true;
			},
			// 验证
			check () {
				if (this.oldPassword && this.newPassword && this.renewPassword && this.oldPassword != "" && this.newPassword != "" && this.renewPassword != "") {	
					if (this.newPassword !== this.renewPassword) {
						uni.showToast({
							title: '密码和新密码输不一致',
							icon: 'none'
						})
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
