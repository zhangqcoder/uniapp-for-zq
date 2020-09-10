
let baseURL = "/mango";
function error(res){
	//do sth
}
export default {
	get: (url, data, config ) => {
		return new Promise((reslove, reject) => {
			uni.request({
				url: baseURL + url,
				method: "GET",
				header: {
					...config
				},
				dataType: "json",
				data: data,
				success: (res) => {
					if (res.statusCode == 200) {
						reslove(res)
					} else {
						error(res)
					}
				},
				fail: (res) => {
					reject(res);
					
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					});
					console.error(res)
				}
			});
		})
	},
	del: (url, data, config) => {
		return new Promise((reslove, reject) => {
			uni.request({
				url: baseURL + url,
				method: "DELETE",
				data: data,
				dataType: "json",
				header: {
					...config
				},
				success: (res) => {
					if (res.statusCode == 200) {
						reslove(res)
					} else {
						error(res)
					}
				},
				fail: (res) => {
					reject(res);
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					});
					console.error(res)
				}
			});
		})
	},
	post: (url, data, config) => {
		return new Promise((reslove, reject) => {
			uni.request({
				url: baseURL + url,
				method: "POST",
				dataType: "json",
				data: data,
				header: {
					...config
				},
				success: (res) => {
					if (res.statusCode == 200) {
						reslove(res)
					} else {
					
						error(res)
					}
				},
				fail: (res) => {
					reject(res);
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					});
					console.error(res)
				}
			});
		})
	},
	put: (url, data, config) => {
		return new Promise((reslove, reject) => {
			uni.request({
				url: baseURL + url,
				method: "PUT",
				dataType: "json",
				data: data,
				header: {
					...config
				},
				success: (res) => {
					if (res.statusCode == 200) {
						reslove(res)
					} else {
						error(res)
					}
				},
				fail: (res) => {
					reject(res);
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					});
					console.error(res)
				}
			});
		})
	},
}
