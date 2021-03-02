<template>
	<view class="main">
		<swiper class="swiper-banner" previous-margin="0rpx" indicator-dots="true" indicator-color="#767574"
		 indicator-active-color="#D8D8D8" :autoplay="autoplay" :interval="3000" :duration="400">
			<swiper-item>
				<view class="swiper-item">
					<uni-icons type="star" :color="isCollected ? 'red' : 'black'" size="30" @tap="collected"></uni-icons>
				</view>
			</swiper-item>
		</swiper>
		<view class="pric-box">
			<view class="pric-img">

			</view>
			<view class="pric-txt">
				<view class="price-origin">
					￥{{info.promotionPrice}}
				</view>
				<view class="prix-b">
					{{info.price}}
				</view>
			</view>
			<view class="pricas">
				{{info.price}}
			</view>
		</view>
		<mp-html :tag-style="tagStyle" :content="info.detailMobileHtml" />

		<view class="fix">
			<view class="disply">
				<view class="dis-img">
					<image src="../../static/icons/share.png" mode="" style="width: 20px;height: 20px;"></image>
				</view>
				<!-- <button class="leftBox" type="default" plain="true" open-type="contact" @contact="contact">
					    打开客服会话
					</button -->
				<!-- v-if="isShow" -->
				<view class="sku-main" v-if="isShow">
					<view class="card">
						<image src="../../static/icons/fail.png" class="close" mode="" @tap="close"></image>
						<image class="img" src="" mode="" v-if="info.skuList.length>0" :src="info.skuList[current].pic"></image>
						<view class="sku-count">
							库存数量:{{info.count}}
							<view class="sku-title">商品选择</view>
							<view class="color-ar">
								<view class="colors">
									<view class="color-item" :class="{active:current==index}" v-for="(item,index) in info.skuList" :key="item.id"
									 @click="current=index">
										<text style="margin-right: 10rpx;" v-for="(ele, index) in item.spData" :key="index">{{ ele.key }}:{{ ele.value }}</text>
									</view>
								</view>
							</view>
							<!-- 			<view class="promise_service">
					<view class="common-title">特色服务</view>
					<view class="works">
						<view class="work-item">送货上门</view>
						<view class="work-item">上门安装</view>
					</view>
				</view> -->
						</view>
						<!-- 购买数量 -->
						<view class="buy-count">
							<view class="but-title">
								购买数量
							</view>
							<view class="step">
								<text class="reduce" @click="countEvents(-1)">-</text>
								<text class="text">{{count}}</text>
								<text class="add" @click="countEvents(+1)">+</text>
							</view>
						</view>
						<view class="btn-buy" @click="get">
							确定
						</view>
					</view>
				</view>

				<view class="dis-cart" @tap="buy(0)">
					添加购物车
				</view>
				<view class="dis-pric" @tap="buy(1)">
					立即购买
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		productDetail,
		addCart,
		addPreOrder
	} from "../../api/kind/index.js"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import mix from '../../minxins/index.js';
	export default {
		comments: {
			uniIcons
		},
		mixins: [mix],
		data() {
			return {
				info: {},
				isShow: false,
				isCollected: false,
				autoplay: true,
				current: 0, //购物车  0 购买 1立即购买
				count: 1,
				tagStyle: {
					img: 'width:90%;height:auto;margin:0 auto;display:block;'
				}
			}
		},
		methods: {
			countEvents(val) {
				if (val < 0) {
					if (this.count == 0) {
						return;
					}
				
				}
					this.count += val
			},

			buy(val) {
				this.current = val;
				this.isShow = !this.isShow;
			},
			close() {
				this.isShow = false;
			},
			get() {
				var obj = {};
				if(!this.checkLogins()){
					//没有登陆
					
				}
				if(this.current==0){
					//添加购物车
					obj = {
				
						productId: this.info.id,
						productSkuId: this.info.skuList[this.current].id,
						quantity: this.count
					}
					addCart(obj)
				}else{
					//立即购买操作
					obj = {
						orderItemList: [{
							productId: this.info.id,
							productQuantity:this.count,
							productSkuId: this.info.skuList[this.current].id,
							
						}]
						
				}
				 addPreOrder(obj).then(res=>{
					 console.log(res);
						uni.showToast({
											title: '购买成功,1s后跳转到订单确认页',
											icon: 'none'
										});
				setTimeout(()=>{
					uni.navigateTo({
						url:`../order/order?id=${res.data.orderId}`
					})
				})
					
				 })
					
			
	}
	},
	
		collected() {
			var goods = uni.getStorageSync("goods");
			if (goods == undefined || goods == "") {
				goods = []
			}
			if (this.isCollected == true) {
				var item = goods.find(ele => ele.proId == this.info.proId);
				var index = goods.findIndex(ele => ele.proId == this.info.proId);
				if (item) {
					//存在商品移除
					goods.splice(index, 1);
				} else {
					goods.push(this.info)
				}

			} else {
				goods.push(this.info)
			}
			this.isCollected = !this.isCollected;
			var goods = uni.setStorageSync("goods", goods);
		}

	},
	
	onLoad(options) {
		productDetail(options.proId).then(res => {
			this.info = res.data.product;
			uni.setNavigationBarTitle({
				title: res.data.product.name
			})
			//进入页面判断商品是否存在本地
			var goods = uni.getStorageSync('goods');
			if (goods.length == 0) {
				this.isCollected = true;
			} else {
				var item = goods.find(ele => ele.proId == res.data.product.proId);
				if (item) {
					this.isCollected = true;
				} else {
					this.isCollected = false;
				}
			}
			this.info.skuList.forEach(ele => {
				ele.spData = JSON.parse(ele.spData);

			})
			this.info = res.data.product
			console.log(res.data.product);
		})
	}
	}
</script>

<style lang="scss">
	.sku-main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 888;
		background-color: rgba(0, 0, 0, .6);

		.card {
			position: absolute;
			left: 50%;
			top: 228rpx;
			margin-left: -314rpx;
			width: 628rpx;
			height: 926rpx;
			background: #F1F1F1;
			border-radius: 40rpx;

			.img {
				position: absolute;
				width: 192rpx;
				height: 192rpx;
				background-color: pink;
				left: 62rpx;
				top: -56rpx;
				border-radius: 10rpx;
			}

			.close {

				position: absolute;
				right: 62rpx;
				top: 62rpx;
				width: 42rpx;
				height: 42rpx;
			}

			.sku-title {
				font-size: 28rpx;
				color: #3e3e3e;
				font-weight: 600;
				margin-top: 42px;
			}

			.sku-count {
				font-size: 24rpx;
				color: #b0b0b0;
				margin-top: 6rpx;
				line-height: 33rpx;
				margin-left: 284rpx;

			}

			.color-ar {
				box-sizing: border-box;
				margin: 28rpx 5rpx;

				.colors {
					display: flex;
					flex-direction: column;
					height: 170rpx;
					width: 100%;
					overflow-y: auto;
				}

				.color-item {
					box-sizing: border-box;
					border: 2px solid transparent;
					float: left;
					width: 100%;
					padding-left: 10rpx;
					height: 60rpx;
					color: #3e3e3e;
					font-size: 26rpx;
					text-align: center;
					line-height: 60rpx;
					background: #f2f4f3;
					border-radius: 10px;
					border-radius: 10px;
					margin: 10rpx 0;

					&.active {
						border: 1px #354e44 solid;
					}
				}

				.line {
					width: 530rpx;
					height: 3rpx;
					background-color: #f2f4f3;
					margin: 36rpx auto;
				}
			}

			.buy-count {
				padding: 0 56rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.step {
					display: flex;
					justify-content: center;

					.reduce,
					.text,
					.add {
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						margin: 0 6rpx;
						background-color: #fff;
						border-radius: 50rpx;
						text-align: center;
						font-size: 30rpx;
					}

				}
			}

			.btn-buy {
				width: 208rpx;
				height: 80rpx;
				background: #354e44;
				border-radius: 14px;
				border-radius: 14px;
				margin: 48rpx auto;
				color: #fff;
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
			}
		}

		.top-name {
			height: 30rpx;
			margin-top: 40rpx;
			margin-left: 23px;
		}
	}


	.swiper-banner {
		width: 100%;
		height: 371px;
		background-color: #F8F8F8;
	}

	.pric-box {
		width: 80%;

		.pric-txt {
			display: flex;

			.price-origin {
				color: red;
				font-size: 48rpx;
			}

			.prix-b {
				color: #555555;
				font-size: 12px;
				line-height: 24px;
				padding-left: 12px;
			}

		}
	}

	.fix {
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 50px;
	}

	.disply {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 5px;
	}

	.dis-cart,
	.dis-pric {
		width: 119px;
		height: 40px;
		margin-top: 5px;
		font-size: 15px;
		line-height: 40px;
		color: #FFFFFF;
		text-align: center;
		background-color: #354e44;
	}
</style>
