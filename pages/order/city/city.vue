<template>
	<view>
		地址选择
		<button type="default" @click="slescle"></button>
		<view class="top-name">
			<view class="" v-for="item in list" :key="item.id"  @click="handel(item)">
				<view class="">
					姓名:{{item.name}}
				</view>
				<view class="_a">
					手机号{{item.phoneNumber}}
				</view>
				<view class="_a">
					
				</view>
			</view>
		</view>
		<simple-address ref="simpleAddress" @onConfirm="onConfirm"></simple-address>
		
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import {findAllAddress} from '../../../api/kind/index.js'
	export default {
		data() {
			components:{
				simpleAddress
			}
			return {
				list:[]
			}
		},
		methods: {
			slescle(){
				this.$refs.simpleAddress.open();
			},
			onConfirm(e){
				console.log(e);
			},
			handel(val){
				uni.setStorageSync("selectArea",val)
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			//判断
		
			findAllAddress().then(res=>{
				console.log(res);
				this.list = res.data.items
			})
		}
	}
</script>

<style>

</style>
