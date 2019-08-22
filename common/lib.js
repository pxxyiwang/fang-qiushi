// 网络监听
const NetWork = {
	// 网络状态
	isConnect: false,
	// 监听网络状态
	on() {
		// 获取当前网络状态
		uni.getNetworkType({
			success: (res) => {
				if (res.networkType !== 'none') {
					this.isConnect = true;
					return;
				}
				uni.showToast({
					title: '请连接网络',
					icon: 'none'
				});
			}
		});
		// 监听网络状态变化
		uni.onNetworkStatusChange((res) => {
			this.isConnect = res.isConnected;
			if (!res.isConnected) {
				uni.showToast({
					title: '您目前处于断网状态',
					icon: 'none'
				})
			}
		})
	}
}

// app更新
const Update = function () {
	// #ifdef APP-PLUS  
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
			uni.request({  
					url: 'http://www.example.com/update/',  
					data: {  
							version: widgetInfo.version,  
							name: widgetInfo.name  
					},  
					success: (result) => {  
							var data = result.data;  
							if (data.update && data.wgtUrl) {  
									uni.downloadFile({  
											url: data.wgtUrl,  
											success: (downloadResult) => {  
													if (downloadResult.statusCode === 200) {  
															plus.runtime.install(downloadResult.tempFilePath, {  
																	force: false  
															}, function() {  
																	console.log('install success...');  
																	plus.runtime.restart();  
															}, function(e) {  
																	console.error('install fail...');  
															});  
													}  
											}  
									});  
							}  
					}  
			});  
	});  
	// #endif  
}

export default {
	NetWork,
	Update
}