<template>
	<view>
		<view class="content">
			<view class="con">
				<image :src="icon" mode="" @click="GetImg"></image>
			</view>
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus placeholder="请输入手机号" v-model="tel" />
			</view>
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus placeholder="登录密码" v-model="password" />
			</view>
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus placeholder="用户名" v-model="user" />
			</view>
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus placeholder="昵称" v-model="nickname" />
			</view>
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus placeholder="验证码" v-model="code" />
			</view>
			<view class="res" @click="get">
				注册
			</view>

			<!-- 底部 -->
			<view class="footer" @click="isshow">
				<view class="dot" v-if="showMess">

				</view>
				<view class="ress">
					同意协议
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		register
	} from "../../api/kind/index.js"
		import baseUrl from "@/api/baseUrl.js"

	export default {
		data() {
			return {
				icon:'../../static/icons/share.png',
				showMess: true, //协议
				tel: '18738858969',
				password: '12346',
				user: 'lop',
				nickname: 'lomda',
				code: '123'
			};
		},
		methods: {
			//
			GetImg(){
				var _this = this;
				uni.chooseImage({
					count:1,
					 sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
					   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
					   //选择图片上传
					  success:function(res){
					
						  var files = res.tempFilePaths[0];
						  uni.uploadFile({
							  url:baseUrl+'/lejuClient/login/uploadAvatar',
							  filePath:files,
							  name:'file',
							 success(relove) {
							 	console.log(relove);
								_this.icon = JSON.parse(relove.data).data.fileUrl;
							 }
						  })
					  }
				})
			},
			isshow() {
				this.showMess = !this.showMess;
			},
			get() {
				if (!this.showMess) {
					uni.showToast({
						title: '请先同意此协议',
						icon: 'none'
					})
				} else {
					register({
					
					  "birthday": "",
					  "city": "",
					  "createTime": "",
					  "email": "",
					  "growth": 0,
					  "historyIntegration": 0,
					  "icon": "",
					  "id": "",
					  "integration": 0,
					  "isDisabled": 0,
					  "memberLevelId": "",
					  "modifyTime": "",
					  "nickname": this.nickname,
					  "password": this.password,
					  "personalizedSignature": "",
					  "phone": this.tel,
					  "realname": "",
					  "sex": 0,
					  "sourceType": 0,
					  "status": 0,
					  "username": this.user,
					  "wxOpenId": "string"
					
					}).then(res => {
						console.log(res);
					if(res.success==true){
						uni.showToast({
							title:'注册成功',
						})
						
					}else{
						uni.showToast({
							title:'重复注册',
						})
					}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.con {
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			margin-top: 64rpx;
			margin-bottom: 64rpx;
			margin-left: auto;
			margin-right: auto;
		}
		
	}

	.uni-column {
		margin-top: 20px;
	}

	.uni-input {
		width: 60%;
		margin: 0 auto;
		border: 1px solid #000;
		border-radius: 0 0 14rpx;
		height: 30px;
		border-radius: 4px;
		padding-left: 12px;
	}

	.res {
		margin: 20rpx auto;
		width: 333rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border: 1px solid #ddd;
		background-color: #435466;
		border-radius: 14rpx;
	}

	.unicdeo {
		width: 10px;
		height: 10px;
		padding-right: 12px;
		border-radius: 50%;
		background-color: #ff557f;

	}

	.footer {
		width: 90%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dot {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		background-color: #333;
	}
</style>
