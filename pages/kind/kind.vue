<template>
	<view class="kind" >
		<view class="creative top"@tap=trade(first.id)>
			<image class="img" :src="first.icon" mode=""></image>
			<view class="name">
				{{first.name}}
			</view>
		</view>
		<view class="style top"@tap=trade(second.id)>
			<image class="img" :src="second.icon" mode=""></image>
			<view class="name">
				{{second.name}}
				
			</view>
		</view>
		<view class="box">	
			<view class="ornament bottom"@tap=trade(third.id)>
				<image class="img" :src="third.icon" mode=""></image>
				<view class="name">
					{{third.name}}
				</view>
			</view>
			<view class="lamp bottom" @tap=trade(fourth.id)>
				<image class="img" :src="fourth.icon" mode=""></image>
				<view class="name">
					{{fourth.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { findCategory } from "../../api/home/index.js"
	export default {
		data() {
			return {
				// 第一个
				first:{},
				second:{},
				third:{},
				fourth:{},
			};
		},
		methods:{
			// 初始化
			init(){
				findCategory("1308336521604599809")
				.then(res =>{
					this.first = res.data.category.children[0];
					this.second = res.data.category.children[1];
					this.third = res.data.category.children[2];
					this.fourth = res.data.category.children[3];
				})
			},
			// 跳转到分类商品列表
			trade(id){
				uni.navigateTo({
					url:`/pages/kind/trade/trade?ids=${id}`
				})
			},
			
		},
		onLoad() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.kind{
		background-color: #F1ECE7;
		overflow: hidden;
		.top{
			width: 670rpx;
			height: 302rpx;
			margin: 56rpx auto;
			background: #d5d5d5;
			box-shadow: 0 12px 20px 0 rgba(83,66,49,.05);
			border-radius: 20px;
			position: relative;
			.img{
				position: absolute;
				right: 0;
				top: 0;
				width: 402rpx;
				height: 302rpx;
			}
			.name{
				position: absolute;
				left: 52rpx;
				top: 148rpx;
				font-size: 48rpx;
				color: #3e3e3e;
			}
		}
		.style{
			background-color: #FFF;
		}
		.box{
			width: 670rpx;
			margin: 56rpx auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bottom{
				width: 312rpx;
				height: 442rpx;
				background: #DDDDDB;
				box-shadow: 0 24rpx 40rpx 0 rgba(83,66,49,.03);
				border-radius: 40rpx;
				position: relative;
				.img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.name{
					position: absolute;
					left: 52rpx;
					top: 148rpx;
					font-size: 48rpx;
					color: #3e3e3e;
				}
			}
			.ornament{
				background: #FFFFFF;
				border-radius: 0;
			}
		}
		
	}
</style>