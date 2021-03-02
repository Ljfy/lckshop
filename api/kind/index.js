import request from "../request.js"

//获取分类列表
function findProductList(start,limit,data){
	return request({
		url:`/lejuClient/product/findProductList/${start}/${limit}`,
		data:data,
		method:"POST"
	})
}
//文章管理
function findBrandsByPage(){
	return request({
		url:`/lejuClient/brand/findBrandsByPage/1/5`
	})
}
//品牌管理
function findArticleByPage(){
	return request({
		url:`/lejuClient/productArticle/findArticleByPage/1/10`
	})
}
//商品详情页
function productDetail(id){
	return request({
		url:`/lejuClient/product/productDetail/${id}`,
			method:"get"
	})
}
//  添加购物车
function addCart(data){
	return request({
		url:`/lejuClient/cart/addCart`,
		method:"POST",
		data
	})
}
//立即购买
function addPreOrder(data){
	return request({
		url:`/lejuClient/order/addPreOrder`,
		method:"POST",
		data
	})
}
//登录
function doLogin(data){
	return request({
		url:`/lejuClient/login/doLogin`,
		method:"POST"
	})
}
// 注册
function register(data){
	return request({
		url:`/lejuClient/member/register`,
		method:"POST",
		data
	})
}

 function getPreOrderById(id){
	return request({
		url:`/lejuClient/order/getPreOrderById/${id}`,
	
	
	})
}
//地址列表
 function findAllAddress(){
	return request({
		url:`/lejuClient/address/findAllAddress`,
	
	
	})
}

 function addConfirmOrder(data){
	return request({
		url:`/lejuClient/order/addConfirmOrder`,
		method:"post",
		data
	
	})
}
 function payConfirm(data){
	return request({
		url:`/lejuClient/order/payConfirm`,
	method:"post",
		data
	
	})
}
 //  获取个人信息
 function getMemberInfo(data){
  	return request({
  		url: '/lejuClient/login/getMemberInfo',
  		method: 'get',
  		data
  	})
  }
 
export {findProductList,
findBrandsByPage,
findArticleByPage,
productDetail,
addCart,
addPreOrder,
doLogin,
register,
getMemberInfo,
getPreOrderById,
findAllAddress,
addConfirmOrder,
payConfirm

}