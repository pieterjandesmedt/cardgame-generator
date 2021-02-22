<template>
	<el-button @click="download()">
		<slot></slot>
	</el-button>
</template>

<script>
	export default {
		props: ['data', 'name'],
		methods: {
			download() {
				const json = JSON.stringify(this.data);
				const blob = new Blob([json], { type: 'application/json' });
				const url = window.URL.createObjectURL(blob);

				const a = document.createElement('a');
				a.download = `${this.name || 'deck'}.json`;
				a.href = url;
				a.textContent = 'Download deck';
				document.body.appendChild(a);
				a.click();
				a.remove();
			},
		}
	};
</script>

<style>
</style>
