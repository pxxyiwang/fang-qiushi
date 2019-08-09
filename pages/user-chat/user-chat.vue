<template>
	<view class="body">
		
		<scroll-view id="scrollview" scroll-y :scroll-top="scrollTop" :scroll-with-animation="true" :style="{height: style.contentH + 'px'}">
			<!-- 聊天列表 -->
			
			<block v-for="(item, index) in list" :key="index">
				<user-chat-list class="user-chat-item" :item="item" :index="index" ref="aa"></user-chat-list>
			</block>
			
			
		</scroll-view>
		
		<!-- 输入框 -->
		<user-chat-bottom @submit="submit"></user-chat-bottom>
	</view>
</template>

<script>
	import userChatBottom from '../../components/user-chat/user-chat-bottom.vue';
	import userChatList from '../../components/user-chat/user-chat-list.vue';
	
	import time from '../../common/time.js';
	
	export default {
		components: {
			userChatBottom,
			userChatList
		},
		data() {
			return {
				scrollTop: 0,
				style: {
					contentH: 0,  // 屏幕信息栏的高度
					itemH: 0 // 屏幕信息栏中每天信息框的总高度
				},
				list:[]
			}
		},
		// 页面加载
		onLoad() {
			this.getData();
			this.initdata();
		},
		// 页面渲染
		onReady() {
			// 页面只会渲染一次，所以必须还要在每次发送信息的时候在调用一次
			this.$nextTick(() => {
				this.pageToBottom();
			})
		},
		created() {
			// this.$nextTick(() => {
			// 	this.pageToBottom();
			// })
		},
		mounted() {
			// this.pageToBottom();
		},
		methods: {
			// 初始化参数 (计算高度)
			initdata () {
				try {
					const res = uni.getSystemInfoSync();
					// 拿到屏幕的高度，减去输入框的高度就是信息框的高度
					this.style.contentH = res.windowHeight - uni.upx2px(120);
					
				} catch (e) {}
			},
			// 计算每一条信息框的高度，判断是否需要滚动（由于操作的是dom，所以必须要在页面渲染完后加载该方法）
			pageToBottom () {
				// uni.createSelectorQuery()能拿到dom节点
				let q = uni.createSelectorQuery();
				// 拿到每一条信息框的节点 (注：目前uni-app文档中，app、微信小程序暂时拿不到自定义子组件里面的dom元素+——2019.8.9)
				q.select('#scrollview').boundingClientRect();
				q.selectAll('.user-chat-item').boundingClientRect().exec((res) => {
					console.log(res);
					res[1].forEach((ret) => {
						this.style.itemH += ret.height;
					});
				});
								
				if (this.style.itemH > this.style.contentH) {
					this.scrollTop = this.style.itemH;
				}
				
			},
			// 发送
			submit (info) {
				// 发送逻辑
				
				//获取时间戳
				let now = new Date().getTime();
				
				let data = {
					isme: true, // 信息发送人人是不是自己
					userpic: '../../static/demo/userpic/10.jpg',
					type: 'text', // 是视屏/图片/文字
					data: '../../static/demo/2.jpg', // 内容
					time: now, // 时间戳
					gstime: time.gettime.getChatTime(now, this.list[this.list.length-1].time)
				};
				data.data = info;
				this.list.push(data);
				this.$nextTick(() => {
						this.pageToBottom();
				})
			},
			// 获取聊天是数据
			getData () {
				// 从后端获取数据
				let arr = [
						{
							isme: false, // 信息发送人人是不是自己
							userpic: '../../static/demo/userpic/11.jpg',
							type: 'text', // 是视屏/图片/文字
							data: '哈哈哈', // 内容
							time: '1554980014' // 时间戳
						},
						{
							isme: true, // 信息发送人人是不是自己
							userpic: '../../static/demo/userpic/10.jpg',
							type: 'img', // 是视屏/图片/文字
							data: '../../static/demo/2.jpg', // 内容
							time: '1554980214' // 时间戳
						}
				];
				
				// 处理数据中的shijianchuo
				for (var i = 0; i < arr.length; i++) {
					arr[i].gstime = time.gettime.getChatTime(arr[i].time, i > 0 ? arr[i-1].time : 0);
				}
				this.list = arr;
			}
		}
	}
</script>

<style scoped>
	.body {
		padding: 20rpx;
	}
	
</style>
