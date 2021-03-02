import baseUrl from "./baseUrl.js"


function fun(config) {
	return new Promise(function(resolve, rejected) {
		uni.request({
			url: baseUrl + config.url,
			method:config.method?(config.method).toUpperCase():"GET",
			timeout:5000,
			data:config.data,
			success(res) {
				resolve(res.data)
			},
			fail(res) {
				rejected(res)
			}
		})
	})
}


export default fun;