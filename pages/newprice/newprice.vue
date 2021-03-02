<template>
	<view>
		<view class="top-bar">
			<view class="item" @click="handelClick(item.value)" :class="{active:item.value==current}" v-for="(item,index) in headItems"
			 :key="item.value">
				<view>
					{{item.name}}
				</view>
			</view>
		</view>
		<view v-if="current!=9">
			<view class="card" v-for="item in orderList" :key="item.id" v-if="orderList.length>0">
				<view class="order-title">
					<text>订单编号:{{item.order.orderSn}}</text>
					<text> {{statusText}}</text>
				</view>
				<view class="sku-block" v-for="sku in item.items">
					<image :src="sku.productPic" mode=""></image>
					<view class="info">
						<view class="p1"><text class="title">{{sku.productName}}</text><text class="price">{{sku.productPrice}}元</text></view>
						<view class="p2"><text>编号:{{sku.id}}</text><text>x {{ sku.productQuantity }}</text></view>
						<view class="p3">规格</view>
					</view>
				</view>
				<view class="title-price">
					<text>时间:{{item.order.createTime}}</text>
					<text>合计:{{item.order.totalAmount}}元</text>
				</view>
				<view class="" v-if="orderList.length==0">
					暂无数据
				</view>
				<view class="btn">
			<view class="btns" @click="currentpaly(item.order.id)" v-if="current==0">取消订单</view>
			<view class="btns" v-if="current==2" @click="enterShop(item)">确认收货</view>
			<view class="btns" @click="paly(item)" v-if="current==0">付款</view>
			<view class="btns" @click="orderDelete(item)" v-if="item.order.status==4">订单删除</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import minx from "../../minxins/index.js"
	import {
		findAllOrders,
		cancelOrder,
		receiveDone,
		deleteOrder,
		orderReturnApplys
	} from "../../api/order/order.js"
	export default {
		mixins: [minx],
		data() {
			return {
				//订单列表
				orderList: [],
				// 退单列表
				orderReturnList: [],
				current: 0, // 当前筛选的订单状态 
				headItems: [{
						name: '待付款',
						value: '0'
					},
					{
						name: '已付款',
						value: '1'
					},
					{
						name: '已发货',
						value: '2'
					},
					{
						name: '已收货',
						value: '3'
					},
					{
						name: '申请退款',
						value: '9'
					}
				],
			}
		},
		onShow() {

			this.checkLogins(this.init)
		},
		onLoad(e) {
			this.current = e.type;
			findAllOrders().then(res => {
				this.orderList = res.data.orderList
				console.log(res)
			})
		},
		methods: {
			handelClick(val) {
				this.current = val
				this.checkLogins(this.init)
			},
			currentpaly(orerId) {
				cancelOrder(orerId).then(res => {
					if (res.success) {
						uni.showToast({
							title: "订单取消成功",
							duration: 1000
						})
					}
				})
			},
			paly(val) {
				uni.navigateTo({
					url: '../order/paly/paly?id=' + val.order.id
				})
			},
			enterShop(orderId){
				receiveDone({
				orderId:orderId.order.id
				}).then(res=>{
					if(res.success){
						uni.showToast({
							title:'确认收货成功！',
							duration:1000
						})
					}
				})
			},
			orderDelete(orerId){
				deleteOrder({orderId:orderId.order.id}).then(res=>{
					console.log(res);
				})
			}

		},
		computed: {
			statusText() {
				if (this.current == 0) {
					return "未付款"
				} else if (this.current == 1) {
					return "等待发货"
				} else if (this.current == 2) {
					return "已发货"
				} else if (this.current == 3) {
					return "已收货"
				} else if (this.current == 9) {
					return "拒绝退货"
				} else {
					return "暂不知道订单状态"
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.top-bar {
		width: 100%;
		position: fixed;
		overflow-y: auto;
		left: 0;
		top: 0;
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 82rpx;
		padding-top: 14rpx;
		background-color: #354e44;
		color: #fff;
		font-size: 30rpx;
		line-height: 62rpx;
		z-index: 999;

		.item {
			radio {
				display: none;
			}

			&.active {
				border-bottom: 2rpx solid #dd524d;
				color: #dd524d;
			}
		}
	}

	.card {
		width: 99%;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 5px;
		margin: 10px auto;
		box-shadow: 2rpx 2rpx 2rpx #ccc;
		padding: 16rpx;
		font-family: sans-serif;
		border: 1px solid #ddd;
		font-size: 24rpx;
		color: #3E3E3E;

		.order-title {
			display: flex;
			line-height: 33rpx;
			display: flex;
			justify-content: space-between;

			.status {
				color: #034c46;
			}
		}

		.sku-block {
			display: flex;
			justify-content: flex-start;
			border-bottom: 1px solid #f1ece7;
			padding: 60rpx 0;
		}

		image {
			width: 162rpx;
			flex-shrink: 0;
			height: 162rpx;
			background-color: #8f8f94;
		}

		.info {
			width: 540rpx;
			margin-left: 56rpx;

			.p1,
			.p2 {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.p1 {
				font-size: 26rpx;
				line-height: 37px;

				.title {
					color: #3F536E;
				}

				.pirce {
					color: #8d8d8d;
				}
			}
		}

		.p2 {
			font-size: 22rpx;
			color: #8d8d8d;
			line-height: 30rpx;
			margin-top: 5rpx;
		}

		.title-price {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			line-height: 54rpx;
			text-align: center;
			margin-top: 24rpx;
		}

		.btn {
			margin-top: 20rpx;
			display: flex;
			justify-content: flex-end;

			.btns {
				width: 134rpx;
				height: 50rpx;
				border: 1px solid #2d4f43;
				font-size: 26rpx;
				border-radius: 10rpx;
				color: #2d4f43;
				text-align: center;
				line-height: 50rpx;
				margin-left: 32rpx;

				&.btn-closed {
					width: auto;
					padding: 0 1em;
					border-color: #dd524d;
				}

			}

		}
	}

	.card-id {
		display: flex;
		justify-content: space-around;


		border-bottom: 1px solid #f1ece7;
		margin-top: 12rpx;

	}
</style>
