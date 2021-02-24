<template>
	<div class="box image is-3by4 is-relative">
		<div class="box-card is-flex-direction-column is-flex m-2">
			<zone v-for="(zone, index) in zones" :key="zone.id" :zone="zone" :value="values[index]"></zone>
		</div>
	</div>
</template>

<script>
import Zone from './Zone.vue';

export default {
	components: { Zone },
	props: ['zones', 'values'],
};
</script>

<style lang="scss">
.box-card {
	width: calc(100% - 1em);
	height: calc(100% - 1em);
	position: absolute;
	top: 0;
	left: 0;
	&.m-2 {
		margin: 0.5em !important;
	}
}
</style>
