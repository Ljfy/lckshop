<template>
	<view>
		<view class="top-play">
			等待支付
		</view>
		<navigator url="./city/city" class="nav">
			<view class="top-bar">
				<view class="top-name">
					姓名:{{area.name}}
				</view>
				<view class="top-tel">
					手机号:{{area.phoneNumber}}
				</view>
				<view class="top-title"  @click="price">
					地址:{{area.city}}{{area.detailAddress}}
				</view>
			</view>
		</navigator> 
		
		<view class="card" >
			<view class="" v-for="item in list" :key = "item.id">
					<view class="card-num">
					<text>	订单编号:{{item.orderSn}}</text>
						<text>{{item.productQuantity}}</text>
					</view>
					<view class="main">
						<view class="main-img">
							<image :src="item.productPic" mode=""></image>
						</view>
						<view class="main-text">
							<text class="p1">{{item.productName}}</text>
							<text class="p2">编号:</text>
							<text class="p3">规格:</text>
						</view>
						<view class="red">
							<text>￥{{item.totalPrice}}元</text>
							<text class="disply-block">x{{item.productQuantity}}</text>
							<text class="dis">合计:{{item.totalPrice}}</text>
						</view>
					</view>
					
					<view class="price-palt" @click="price">
						去付款
					</view>
					<!-- <view class="card-img">
						<image :src="item.productPic" mode=""></image>
					</view> -->
					<!-- view class="main">
						<view class="card-name">
							{{item.productName}}
						</view>
						<view class="car-g">
							规格
						</view>
					</view> -->
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {getPreOrderById,addConfirmOrder} from "../../api/kind/index.js"
	import minx from "../../minxins/index.js"
	export default {
		data() {
			return {
				list:[],
				area:'',
				id:''
				
			};
			
		},
		mixins:[minx],
		onShow() {
			var area = uni.getStorageSync('selectArea');
			this.area = area;
			
		
		},
		onLoad(options) {
			if(!this.checkLogins()){
				return
			};
			this.id = options.id;
			getPreOrderById(options.id).then(res=>{
				this.list = res.data.orderItems;
				console.log(res.data.orderItems);
				
			})
		},
	methods:{
		price(){
		console.log(this.id);
		var obj = {
			"orderId":this.id,
			"payType": 0,
			"sourceType": 1
		};
		addConfirmOrder(obj).then(res=>{
			console.log(res,1123);
		uni.navigateTo({
			url:`paly/paly?orderid=${res.data.orderId}`
		})	
		})
		
		}
	}
	}
</script>

<style lang="scss">
.top-play{
	height: 88rpx;
	line-height: 88rpx;
	margin: 0 50rpx;
	font-size: 36rpx;
	color: #494949;
	box-sizing: border-box;
	border-bottom: 1px solid #ccc;
}
.top-bar{
	display: block;
	padding-left: 14rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 38rpx;
	color: #354E44;
}
.nav{
	display: block;
	height: 200rpx;
}
.card{
	display: flex;
	width: 100%;
	height: 600rpx;
	box-sizing: border-box;
	padding: 36rpx;
	border-radius: 24rpx;
	background-color: #fff;
	font-size: 24rpx;
	color:#3E3E3E;
}
.main{
	display: flex;
	justify-content: flex-start;
	margin-top: 50rpx;
	border-bottom: 1px solid #ccc;
	padding: 30rpx;
	image{
		display: block;
		width: 162rpx;
		height: 162rpx;
		background-color: #000;
	}
	.main-text{
		width: 290rpx;
		margin-left: 14rpx;
		.p1,.p2{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.p1{
			font-size: 26rpx;
			line-height: 37px;
		}
		
	}
	.red{
		font-size: 28rpx;
		padding-top: 12rpx;
		.disply-block{
			display: block;
			padding-left: 4rpx;
		}
		.dis{
			display: block;
			margin-top: 56rpx;
			font-size: 42rpx;
			color: red;
		}
	}
}
.price-palt{
	margin: 25rpx 0;
	width: 160rpx;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
	border: 1px solid #ccc;
	border-radius: 14rpx;
	font-size: 36rpx;
}
</style>
