<template>
	<view class="find">
		<view class="header">
			<text :class="isShow ? 'active' : ''" @tap="addClass">精选文章</text>
			<text :class="isShow ? '' : 'active'" @tap="addClass2">品牌列表</text>
		</view>
		<view class="find-list" v-if="isShow">
			<view class="find-item" v-for="item in list" :key="item.id">
				<view class="pic">
					<image :src="item.coverImg" mode=""></image>
					<text class="title">{{item.title}}</text>
					<text class="con">{{item.author}}</text>
				</view>
				<view class="info">
					<view class="head">
						<image src="../../static/icons/chat.png" mode="" ></image>
						<text>{{item.viewCount}}</text>	
					</view>
					<view class="icon" >
						<uni-icons type="star" :color="ischeck?'red':'#000'" size="30" @tap="college(item.id)"></uni-icons>
					</view>
				</view>
			</view>
		
		</view>
		
		<view class="brand-list" v-else>
			<view class="item" v-for="ele in listBrand" :key="ele.id">
				<image :src="ele.bigPic" mode=""></image>
				<view class="info">
					<view>{{ele.name}}</view>
					<view>{{ele.brandStory}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../components/uni-icons/uni-icons.vue"
	import mp from "../../components/mp-html/mp-html.vue"
	import { findArticleByPage,findBrandsByPage } from "../../api/kind/index.js"
	export default {
		components:{
			uniIcons,
			mp
		},
		data() {
			return {
				isShow:false,
				list:{},
				listBrand:[],
				ischeck:false,
				
			};
		},
		methods:{
			init() {
				findArticleByPage().then(res=>{
					this.list = res.data.rows
					console.log(this.list)
				})
			},
			addClass() {
				this.isShow = true
				this.init()
			},
			addClass2() {
				this.isShow = false
				findBrandsByPage().then(res=>{
					this.listBrand = res.data.rows
				})
			},
			task(){
				this.ischeck = !this.ischeck;
			},
			college(id){
				
				
				var goods = uni.getStorageSync('goods');
				if(goods==undefined||goods==null){
					goods=[];
				}
				//取消收藏 
				if(this.ischeck==true){
					//先判断是否存在该商品
					var item = this.list.find(ele=>ele.id==this.list.id);
					var index = this.list.findIndex(ele=>ele.id==this.list.id);
					if(item){
						goods.splice(index,1)
					}else{
						goods.push(this.list)
					}
					this.ischeck = !this.ischeck;
					uni.setStorageSync("goods",goods)
				}
				
				// var list1 =uni.getStorageSync('list');
				// var item = this.list.find(ele=>{
				// 	return ele.id==id;
				//  })
				// if(list1){ //判断本地是否存在收藏数据
				// const index = list1.findIndex((ele=>ele.id==id))
				// 	if(index>=0){
				// 		//如果本地有收藏的ID,则取消收藏
				// 		item.ischecked=false;
				// 		list1.splice(index,1);
				// 		uni.setStorageSync('listBrand',list1);
				// 		uni.showToast({
				// 			title:'取消成功',
				// 			icon:'none'
				// 		})
				// 	}
				// }
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
.find {
	background-color: #f1ece7;
	color: #3E3E3E;
}
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 88rpx;
	background-color: #354e44;
	color: #fff;
	text {
		margin: 0 10rpx;
		padding: 10rpx 0;
		border-bottom: 1px solid transparent;
		&.active {
			border-bottom: 1px solid #fff;
		}
	}
}
.find-list {
	padding: 10rpx 38rpx 40rpx;
	.find-item{
		background-color: #808080;
		margin-bottom: 28rpx;
		border-radius: 24rpx;
		.pic {
			position: relative;
			width: 100%;
			height: 382rpx;
			border-radius: 24rpx 24rpx 0 0;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
			.title {
				position: absolute;
				top: 244rpx;
				left: 20rpx;
				color: #FFFFFF;
				font-size: 48rpx;
			}
			.con {
				position: absolute;
				top: 316rpx;
				left: 20rpx;
				color: #FFFFFF;
				font-size: 30rpx;
			}
		}
		.info {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 60rpx;
			width: 100%;
			height: 100rpx;
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 116rpx;
				height: 100rpx;
				image {
					width: 40rpx;
					height: 40rpx;
					
				}
				text {
					font-size: 26rpx;
				}
			}
			.icon {
				display: block;
				width: 40rpx;
				height: 40rpx;
		
			}
		}
	}
}
// brand
.brand-list {
	padding: 10rpx 15px 40rpx;
	.item {
		background-color: #fff;
		border-radius: 8rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		image {
			width: 690rpx;
			height: 480rpx;
		}
		.info {
			margin: 30rpx;
			view {
				&:first-child {
					font-size: 32rpx;
					font-weight: 700;
				}
				&:last-child {
					font-size: 24rpx;
					color: #b1b1b1;
				}
			}
		}
	}
}
 </style>