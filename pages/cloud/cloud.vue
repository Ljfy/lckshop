<template>
	<view>
		<view class="title">
			<h3>ledladal</h3>
		</view>
		<view class="card">
			<view class="title-t">
				跳过
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #3F536E;
	}
	.title{
		position: absolute;
		color: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%);
	}
	.card{
		width: 99%;
		display: flex;
		justify-content: flex-end;
		.title-t{
			width: 100rpx;
			height: 40rpx;
			margin-top: 12rpx;
			line-height: 40rpx;
			color: #fff;
			font-size: 24rpx;
			text-align: center;
			border: 1px solid #C0C0C0;
			border-radius: 14rpx;
		}
	}
</style>
