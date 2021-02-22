<template>
	<el-card class="box-card">
		<zone v-for="(zone, index) in zones" :key="zone.id" :zone="zone" :value="values[index]"></zone>
	</el-card>
</template>

<script>
	import Zone from './Zone.vue';

	export default {
		components: { Zone },
		props: ['zones', 'values'],
	};
</script>

<style>
	.box-card {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.box-card .el-card__body {
		height: 100%;
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: .5em;
	}
</style>
