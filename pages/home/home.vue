<template>
	<view class="home">
		<view :style="{paddingTop:topH+'px'}" class="top">
		</view>
		<!-- 轮播 -->
		<view class="banner">
			<swiper class="swiper" :autoplay="true"
							:indicator-dots="true"
							indicator-active-color="#fff"
							indicator-color="rgba(255,255,255, .5)"
							duration="400"
							:circular="true">
				<swiper-item v-for="item in list" :key="item.id">
					<view class="item">
						<image :src="item.pic" class="img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="session">
			<view v-for="item in findList" :key="item.id" class="icon-kind" @tap="findPge">
				<image :src="item.icon" class="icon-img"></image>
				<view class="icon-text">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 限时活动 -->
		<view class="session-fily">
			<image src="../../static/icons/zan.png" mode="widthFix" style="width: 20px;"></image>
			<text>限时活动</text>
			<swiper class="remo-swipper" :vertical="true" :circular="true" :autoplay="autoplay" :interval="2000" :duration="1000">
				<swiper-item v-for="x in recommendList" :key="x.id" class="removeItem">
					<navigator class="nav-item" :url="'../info/info?proid='+x.productId">
						<view class="name">
							{{x.name}}
						</view>
						<view class="price">
							<view class="text" style="text-decoration: line-through;color: #333;">
								{{x.price}}元
							</view>
							<view class="text" style="color: red;">
								{{x.promotionPrice}}元
							</view>
						</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 热门推荐 -->
		<view class="hot">
			<text class="hot-name">热门推荐</text>
			<view class="hot-box">
				<swiper class="my-swiper" :display-multiple-items="3" :circular="true" easing-function='linear' :autoplay="autoplay"
				 :duration="1000">
					<swiper-item v-for="item in hotList" :key="item.id" class="item-block">
						<image :src="item.pic" class="img-list" style="width: 208rpx;
				height: 176rpx; "></image>
						<view class="content">
							{{item.name}}
						</view>
						<view class="swiper-item"></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 新品推荐 -->
		<view class="new-shop">
			<text>新品推荐</text>
			<swiper :display-multiple-items="3" :circular="true" easing-function='linear' :autoplay="autoplay" :duration="1000">
				<swiper-item v-for="item in hotList" :key="item.id" class="item-block">
					<image :src="item.pic" style="width: 208rpx;
				height: 176rpx; "> </image>
					<view class="content">
						{{item.name}}
					</view>
					<view class="swiper-item"></view>
				</swiper-item>
			</swiper>
		</view>
	</view>


</template>
<script>
	import {
		bannerAds,
		findCategory,
		recommendList,
		hotList,
		saleMostProducts
	} from "../../api/home/index.js"
	export default {
		data() {
			return {
				list: [],
				autoplay: true,
				findList: [],
				recommendList: [],
				hotList: [],
				topH: 0,
				// new
				newList: []
			}
		},
		methods: {
			findPge() {
				uni.navigateTo({
					url: './findPge/list?kindId=' + this.findList[0].id
				})

			}
		},
		onLoad() {
			saleMostProducts().then(res => {
				this.newList = res.data.items;
			})
			bannerAds().then(res => {
					this.list = res.data.items;

				}),
				findCategory("1308336521604599809")
				.then(res => {

					this.findList = res.data.category.children;


				})
			recommendList().then(res => {
				this.recommendList = res.data.items;

				console.log(res.data.items, '213')
			})
			// 热门推荐
			hotList().then(res => {
				console.log(res);
				this.hotList = res.data.items;

			})

			// this.topH = uni.getMenuButtonBoundingClientRect().height + uni.getMenuButtonBoundingClientRect().top
		}
	}
</script>

<style lang="scss" scoped>

	.session {
		width: 100%;
		margin: 60rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.icon-kind {
			width: 120rpx;
			text-align: center;
		}
		.icon-img {
			display: block;
			border: 1px solid #eee;
			width: 80rpx;
			height: 80rpx;
			border-radius: 8rpx;
		}
		.icon-text {
			font-size: 32rpx;
			color: #3e3e3e;
			padding-top: 20rpx;
			padding-right: 50rpx;
			text-align: center;
		}
	}
	.session-fily {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 40rpx auto;
		width: 670rpx;
		height: 96rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #3e3e3e;
		line-height: 96rpx;
		text-indent: 0.5em;
		.remo-swipper {
			flex: 1;
			height: 96rpx;
			.removeItem {
				.nav-item {
					display: flex;
					width: 100%;
					height: 100%;
					justify-content: flex-start;
					align-items: center;
				}
				.name {
					width: 250rpx;
					height: 60rpx;
					line-height: 60rpx;
					display: inline-block;
					overflow: hidden;
					white-space: normal;
					text-overflow: ellipsis;
				}
				.price {
					font-size: 24rpx;
					line-height: 30rpx;
				}
			}

		}

	}
	// 热门推荐
	.new-shop,
	.hot {
		width: 100%;
		margin-left: 30rpx;
		height: auto;
		.hot-name {
			padding-left: 10rpx;
		}
		.item-block {
			width: 590rpx;
			display: inline-block;
			margin: 10rpx auto;
		}
		.content {
			font-size: 26rpx;
			line-height: 38rpx;
			text-align: center;
			margin-top: 20rpx;
			font-weight: 600;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.banner{
		width: 100%;
		height: 278rpx;
		margin: 30rpx auto 44rpx;
		.swipper{
			height: 268rpx;
		}
		
		.item{
			display: block;
			width: 686rpx;
			height: 308rpx;
			margin: 0 auto;
			border-radius: 18rpx;
			overflow: hidden;
		}
		.img{
			display: block;
			width: 100%;
			height: 100%;
		}
		
	}
</style>
