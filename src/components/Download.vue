<template>
	<b-button type="is-primary" @click="download" :disabled="disabled">
		<slot></slot>
	</b-button>
</template>

<script>
export default {
	props: ['data', 'name', 'disabled'],
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
	},
};
</script>

<style></style>
