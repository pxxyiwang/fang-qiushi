<template>
	<view>
		<detail-info :item="detail"></detail-info>
	
		<!-- 评论 -->
		<view class="u-comment-title">最新评论 1</view>
		
		<view class="uni-comment u-comment">
			<comment-list :comment="comment"></comment-list>
		</view>
	</view>
</template>

<script>
	import detailInfo from '../../components/detail/detail-info.vue';
	import commentList from '../../components/detail/comment-list.vue';
	
	import time from '../../common/time.js';

	
	export default {
		components: {
			detailInfo,
			commentList
		},
		data() {
			return {
				comment: {
					count: 20,
					list: []
				},
				detail: {
							userpic: '../../static/demo/datapic/1.jpg', // 头像
							username: '忆忘', // 昵称
							sex: 1, // 0 男 1 女
							age: 25, // 年龄
							isguanzhu: false, // 是否关注
							title: '黑夜的烟火,绚丽而短暂', // 标题
							titlepic: '../../static/demo/datapic/14.jpg', // 主题 图片（默认显示第一张图片信息）
							morepic: ['../../static/demo/datapic/14.jpg','../../static/demo/datapic/13.jpg','../../static/demo/datapic/12.jpg','../../static/demo/datapic/11.jpg','../../static/demo/datapic/10.jpg','../../static/demo/datapic/9.jpg'], // 图片应该使用一个数组来装
							video: false, // 主题 视屏
							share: false, // 主题 分享
							path: "深圳 龙岗", // 地址
							sharenum: 20, // 分享数量
							commentnum: 30, // 评论数
							goodnum: 20 // 点赞
							
						},
			}
		},
		onLoad(e) {
			this.initData(JSON.parse(e.detailData));
			this.getComment();
		},
		// 监听导航右边按钮
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				console.log('分享');
			}
		},
		methods: {
			// 初始化数据
			initData (obj) {
				// 修改标题
				uni.setNavigationBarTitle({
					title: obj.title
				})
			},
			// 获取评论
			getComment () {
				let arr = [
					
						// 一级评论
						{
							id: 1,
							fid: 0, // 评论的级数
							userpic: '../../static/demo/datapic/2.jpg',
							username: '闻说',
							time: '1565342064', // 时间戳,
							data: '图片好看'
						},
						// 子级评论
						{
							id: 2,
							fid: 1, // 评论的级数
							userpic: '../../static/demo/datapic/3.jpg',
							username: '听说',
							time: '1565342064', // 时间戳,
							data: '好看好看好看好看好看好看好看'
						},
						{
							id: 3,
							fid: 1, // 评论的级数
							userpic: '../../static/demo/datapic/4.jpg',
							username: '你说',
							time: '1565342064', // 时间戳,
							data: '好看好看好看好看好看好看好看'
						},
						// 一级评论
						{
							id: 4,
							fid: 0, // 评论的级数
							userpic: '../../static/demo/datapic/2.jpg',
							username: '胡说',
							time: '1565342064', // 时间戳,
							data: '呵呵呵呵呵呵呵呵和！！！！！！！！！'
						}
				]
				for (var i = 0; i < arr.length; i++) {
					arr[i].time = time.gettime.gettime(arr[i].time);
				}
				this.comment.list = arr;
			}
		}
	}
</script>

<style scoped>
	.u-comment {
		padding: 0 20rpx;
	}
	.u-comment-title {
		padding: 20rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
</style>
