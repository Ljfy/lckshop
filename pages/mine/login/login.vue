<template>
	<view>
		<view class="uni-hd">
		</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" focus placeholder="" v-model="username" />

		</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" focus placeholder="" v-model="password" />
		</view>

		<view class="btn" @click.native="login">
			登录
		</view>
		<view class="res">
			<view class="pwd">
				找回密码
			</view>
			<view class="">
				|
			</view>
			<view class="" @tap="register">
				注册账号
			</view>
		</view>
	</view>
</template>

<script>
	import {
		doLogin,getMemberInfo
	} from "../../../api/kind/index.js"
	
	import WxValidate from "../../../utils/val.js"
	export default {
		data() {
			return {
				username: "18738858969",
				password: "123456",
			};
		},
		onLoad() {
			this.initValidate();
		},
		methods: {
			register(){
				uni.navigateTo({
					url:'../../register/register'
				})
			},
			initValidate(){
				let rules = {
					username:{
						required:true,
						tel:true
					}
				}
				let message = {
					username:{
						required:'请输入账户',
						tle:'请输入正确的手机号'
					}
				}
				//
				this.WxValidate = new WxValidate(rules,message);
			},
		async login() {
		var parms={
			username:this.username,
			password:this.password
		}
		if(!this.WxValidate.checkForm(parms)){
			//表单验证不通过
			let error = this.WxValidate.errorList[0];
			console.log(error);
		}else{
			var result = await doLogin(parms);
			console.log(result);
			
			uni.setStorageSync('token',result.data.token)
			var userInfo = await getMemberInfo();
			uni.setStorageSync("userInfo",userInfo.data.userInfo)
			uni.showLoading({
				title:"登陆成功!"
			})
			setTimeout(()=>{
				uni.switchTab({
					url:'../mine'
				})
			},1000)
		}
			}
		}

	}
</script>

<style lang="scss">
	.uni-hd {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #000;
		margin-top: 64px;
		margin-bottom: 64px;
		margin-left: auto;
		margin-right: auto;
		background: url(../../../static/icons/QQ.png)no-repeat center;
	}

	.uni-input {
		border: none;
		width: 60%;
		margin: 0 auto;
		border: 1px solid #000;
		height: 30px;
		border-radius: 4px;
		padding-left: 12px;
	}

	.uni-form-item {
		margin-top: 12px;
	}

	.btn {
		width: 120px;
		height: 40px;
		color: #FFFFFF;
		line-height: 40px;
		border-radius: 50px;
		box-sizing: 2px 2px 3px 5px #ddd;
		text-align: center;
		background-color: rgb(53, 78, 68);
		margin: 30px auto;
	}

	.res {
		display: flex;
		align-items: center;
		justify-content: center;

	}
</style>
