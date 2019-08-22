<template>
	<view class="body">
		<block v-for="(item, index) in list" :key="index">
			<home-list-item :item="item" :index="index"></home-list-item>
		</block>
		<button class="user-set-btn" type="primary">退出登陆</button>
	</view>
</template>

<script>
	import homeListItem from '../../components/home/home-list-item.vue';
	export default {
		components: {
			homeListItem
		},
		data() {
			return {
				list: [
					{icon: "", name: "账号与安全", clickType: "navigateTo", url: "../../pages/user-set-repassword/user-set-repassword"},
					{icon: "", name: "绑定邮箱", clickType: "navigateTo", url: "../../pages/user-set-email/user-set-email"},
					{icon: "", name: "资料编辑", clickType: "navigateTo", url: "../../pages/user-set-userinfo/user-set-userinfo"},
					{icon: "", name: "小纸条", clickType: "", url: ""},
					{icon: "", name: "清除缓存", clickType: "clear", url: ""},
					{icon: "", name: "意见反馈", clickType: "navigateTo", url: "../../pages/user-set-help/user-set-help"},
					{icon: "", name: "关于糗百", clickType: "navigateTo", url: "../../pages/user-set-about/user-set-about"}

				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	@import "../../common/form.css";
</style>
