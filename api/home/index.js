import request from "../request.js"


// 轮播
function bannerAds() {
	return request({
		url: "/lejuClient/home/bannerAds"
	})
}

// 分类
function findCategory() {
	return request({
	url:"/lejuClient/productCategory/findCategory/1308336521604599809"
	})
}

function recommendList() {
	return request({
		url: `/lejuClient/home/recommendList`
	})
}
// 热门推荐

function hotList() {
	return request({
	url:"/lejuClient/home/hotList"
	})
}
// 商品展示
function findProductList(){
	return request({
		url:'/lejuClient/product/findProductList/{start}/{limit}',
		method:"post",
		data
	})
}

//最高销量
function saleMostProducts(){
	return request({
		url:'/lejuClient/home/saleMostProducts',
	
	})
}

export {
	bannerAds,
	findCategory,
	recommendList,
	hotList,
	findProductList,
	saleMostProducts
}
