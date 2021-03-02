<template>
	<view class="content">
		<view class="mine-box">
			<view class="mine-img">
				<image class="active" :src="listInfo.icon" mode="" @click="getInfo"></image>
			</view>
			<view class="info">
				<template v-if="listInfo.nickname">
					<view>{{listInfo.nickname}}</view>
					<view>用户名:{{listInfo.username}}</view>
				</template>
				<template v-else>
					<view>Hi~</view>
					<view>您还没有登陆呢</view>
				</template>

			</view>
		</view>
		<view class="my-order">
			<view class="my-title">
				我的订单
			</view>
			<view class="navs">
				<navigator url="../newprice/newprice?type=0">
					<image src="../../static/icons/icon-pay.png" mode=""></image>
					<view class="text">
						待付款
					</view>
				</navigator>
				<navigator url="../newprice/newprice?type=1">
					<image src="../../static/icons/pay-done.png" mode=""></image>
					<view class="text">
						已付款
					</view>
				</navigator>
				<navigator url="../newprice/newprice?type=2">
					<image src="../../static/icons/icon-done.png" mode=""></image>
					<view class="text">
						待发货
					</view>
				</navigator>
				<navigator url="../newprice/newprice?type=3">
					<image src="../../static/icons/icon-done.png" mode=""></image>
					<view class="text">
						已发货
					</view>
				</navigator>
				<navigator url="../newprice/newprice?type=9">
					<image src="../../static/icons/icon-pay.png" mode=""></image>
					<view class="text">
						售后
					</view>
				</navigator>
			</view>
			
		</view>
		<view class="grid">
			<view class="grid-item" v-for="item in goodsList" :key="item.text">
				<view class="">
					<image :src="item.img" mode=""></image>
					<text>	{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import minx from "../../minxins/index.js"
	import {
		getMemberInfo
	} from "../../api/kind/index.js"
	export default {
		mixins: [minx],
		data() {
			return {
				listInfo: [],
				goodsList: [{
						url: '',
						img: '../../static/icons/save.png',
						text: '商品收藏'
					},
					{

						url: '',
						img: '../../static/icons/brand.png',
						text: '品牌'
					},
					{
						url: '',
						img: '../../static/icons/article.png',
						text: '文章收藏'
					},
					{
						url: '',
						img: '../../static/icons/address.png',
						text: '地址'
					},
					{
						url: '',
						img: '../../static/icons/card.png',
						text: '卡包'
					},
					{

						img: '../../static/icons/cart2.png',
						text: '购物车'
					},
					{

						img: '../../static/icons/cart2.png',
						text: '联系客服'
					},
				]
			}
		},
		onLoad() {
			getMemberInfo().then(res => {
				console.log(res);
				this.listInfo = res.data.userInfo;
			})
		},
		onShow() {
			this.checkLogins(this.init)
		},
		methods: {
			init() {
				var res = uni.getStorageInfoSync('userInfo');
				this.listInfo = res;
				console.log(res);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-box {
		display: flex;
		align-items: center;
		padding-left: 60rpx;
		width: 100%;
		height: 75px;
		padding-top: 30px;

		.active {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
		}

		.info {
			display: flex;
			height: 75px;
			line-height: 75px;
			margin-left: 16px;
			color: #3d4c46;
			font-size: 14px;
			box-sizing: border-box;
			padding: 7px 0;
		}
	}

	.my-order {
		width: 335px;
		height: 104px;
		border-radius: 2px;


		margin: 60rpx 0 0 50rpx;

		.my-title {

			height: 66rpx;
			line-height: 66rpx;
			margin: 0 12rpx;
			font-size: 26rpx;
			border-bottom: 1px solid #ccc;
			color: #999;
		}
	}

	.navs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		padding: 20rpx 0;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.grid {
		width: 670rpx;
		margin-top: 60rpx;
		background-color: #fff;
		border-radius: 20rpx;
		text-align: center;
		margin: 0 auto;
		padding: 30rpx 0 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		.grid-item {
			width: 33.33%;
			min-height: 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				display: flex;
				width: 50rpx;
				height: 50rpx;
				margin: 30rpx auto;
			}
			.text{
				font-size: 24rpx;
				line-height: 38rpx;
			}
		}
	}
</style>
