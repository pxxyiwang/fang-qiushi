<template>
	<view>
		<!-- view -->
		<!-- <view class="view-box animated" hover-start-time="2000"
		hover-class="view-box-hover rubberBand">第一个view</view>
	-->
	
	<!-- text -->
	<!-- <text :selectable="false">这是一个text\n这是一个text\n这是一个text\n</text> -->
	
	<!-- <view class="view-box" id="view2">这是一个view</view> -->
	
	<!-- css3一些常用的选择器 -->
	<!-- <view class="box">
		<text>text</text>
		<view>1</view>
		<view>2</view>
		<view>3</view>
		<view>4</view>
		<view>5</view>
		<view>6</view>
		<view>7</view>
	</view> -->
	
	<!-- flex布局 -->
	<!-- <view class="box">
		<view class="box-item">1</view>
		<view class="box-item">2</view>
		<view class="box-item">3</view>
		<view class="box-item">4</view>
		<view class="box-item">5</view>
		<view class="box-item">6</view>
	</view> -->
	
		<!-- 事件处理器 -->
		<view>{{name}}</view>
		<view class="box-2" @tap="clickenent()">按钮</view>
		
		<view class="box-b" @tap="boxb()">
			外面
			<view class="box-o" @tap.stop="boxo()">里面</view>
		</view>
	</view> 
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				name: '哈哈哈'
			}
		},
		mounted() {
			_this = this;
		},
		methods: {
			clickenent: () => {
				_this.name = '呢讷讷';
				console.log('点击了!');
			},
			boxb:function() {
				console.log('点击了外面');
			},
			/* boxb: () => {
				console.log('点击了外面');
			}, */
			boxo: () => {
				console.log('点击了里面');
			}
		}
	}
</script>

<style>
/* 事件处理器 */
.box-2 {
	background: #09BB07;
	color: #FFFFFF;
	width: 80%;
	margin: auto;
	height: 80rpx;
	font-size: 50rpx;
	border-radius: 30rpx;
	border: 1rpx solid #EEEEEE;
	display: flex;
	justify-content: center;
	align-items: center;
}
.box-b {
	width: 100%;
	height: 500rpx;
	background: #007AFF;
	color: #FFFFFF;
	fint-size: 40rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.box-o {
	width: 300rpx;
	height: 300rpx;
	background: #09BB07;
	color: #FFFFFF;
	fint-size: 40rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

/* .view-box {
	width: 200rpx;
	height: 200rpx;
	background: #007AFF;
	color: #FFFFFF;
	margin: 100rpx;
}
.view-box-hover {
	background: red;
}
#view2 {
	background: yellow;
}
.box {
	width: 200rpx;
	height: 200rpx;
	background: #007AFF;
	color: #FFFFFF;
	margin: 100rpx;
}
.box view {
	font-size: 30rpx;
} */
/* 使用 :nth-child这个可以选择元素的指定子元素，但是如果元素中的第一个子元素不是view这个标签（比如是text标签），那么:nth-child这个选择会出bug，这个时候可以使用 :nth-of-type这个就会生效 */
/* .box>view:nth-child(1) {
	background: red;
}
.box>view:nth-child(2) {
	background: black;
}
.box>view:nth-child(3) {
	background: blue;
}
.box>view:nth-of-type(1) {
	background: red;
}
.box>view:nth-of-type(2) {
	background: black;
}
.box>view:nth-of-type(3) {
	background: blue;
} */

/* 使用 :first-child 和 :last-child ，如果元素的第一个子元素不是view（比如是text标签）则:first-child不会生效 要使用 :first-of-type :last-of-type才会生效 */
/* .box>view:first-child {
	background: red;
}
.box>view:last-child {
	background: pink;
}
.box>view:first-of-type {
	background: red;
}
.box>view:last-of-type {
	background: pink;
} */

/* 奇偶选择器 */
/* 使用 :nth-child这个可以选择元素的指定子元素，但是如果元素中的第一个子元素不是view这个标签（比如是text标签），那么:nth-child这个选择会出bug，这个时候可以使用 :nth-of-type这个就会生效 */
/* .box>view:nth-child(2n-1) {
	background: red;
}
.box>view:nth-child(2n) {
	background: pink;
} */
/* 偶数 */
/* .box>view:nth-child(even) {
	background: red;
} */
/* 基数 */
/* .box>view:nth-child(odd) {
	background: pink;
} */
/* 偶数 */
/* .box>view:nth-of-type(even) {
	background: red;
} */
/* 基数 */
/* .box>view:nth-of-type(odd) {
	background: pink;
} */

/* flex */
.box {
	width: 100%;
	height: 500rpx;
	border: 1rpx solid #CCCCCC;
	/* 所有子元素默认排列成一行,当子元素很多时,会压缩子元素的width,使得可以在一行中,但是有时候,有些子元素不希望被压缩,可以给该子元素添加flex-shrink: 0; 0:不压缩  1:压缩 */
	display: flex;
	/* 换行  wrap:正序换行 wrap-reverse:倒序换行*/
	/* flex-wrap: wrap; */
	/* 水平居中:均匀分配 center:居中 space-between:两端对齐 flex-end:尾部对齐（挤到右边） flex-start:头部对齐（挤到左边） */
	/* justify-content: center; */
	/* 垂直居中  center：相对父元素上下居中 stretch：子元素占满父元素（子元素的height和line-height不能设置，否则不生效）flex-end：再父元素底部 */
	/* align-items: center; */
	
	/* 每个子元素各占一行  */
	/* flex-direction: column; */
}
.box-item {
	background: #007AFF;
	color: #FFFFFF;
	height: 200rpx;
	width: 200rpx;
	line-height: 30rpx;
	font-size: 30rpx;
	font-weight: bold;
	text-align: c;
	/* flex: 1; */
	/* 实现子元素内部元素居中 */
	display: flex;
	justify-content: center;
	align-items: center;
}
/* align-self子元素单独设置位子 */
/* .box-item:nth-of-type(odd) {
	background: #09BB07;
	align-self: flex-end;
}
.box-item:nth-of-type(even) {
	background: #007AFF;
} */
</style>
