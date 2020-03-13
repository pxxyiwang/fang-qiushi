<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// console.log(this.config.webUrl)
			// 网络监听 （用户目前断网，切换wifi）
			// this.lib.NetWork.On();
			// 初始化用户状态
			this.user.__init();
			// 更新检测
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方css库 */
	@import './common/uni.css';
	/* 引入自定义图标库 */
	@import './common/icon.css';
	/* 引入动画库 */
	@import './common/animate.css';
	/* 引入公共样式 */
	@import './common/common.css';
</style>
