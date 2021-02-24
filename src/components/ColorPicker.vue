<template>
	<b-tooltip position="is-right" type="is-white" :triggers="[]" :always="isTooltipOpen">
		<b-button
			:style="{ 'background-color': `${value}`, color: 'white' }"
			icon-left="brush"
			@click="toggleTooltip"
		></b-button>
		<template v-slot:content>
			<compact :value="value" @input="input"></compact>
		</template>
	</b-tooltip>
</template>

<script>
import { Compact } from 'vue-color';

export default {
	props: ['value'],
	components: { Compact },
	data() {
		return {
			isTooltipOpen: false,
		};
	},
	methods: {
		input(value) {
			this.$emit('input', value);
			this.toggleTooltip();
		},
		toggleTooltip() {
			this.isTooltipOpen = !this.isTooltipOpen;
		},
	},
};
</script>

<style lang="scss">
.tooltip-content {
	padding-right: 2em;
	& > div {
		box-shadow: none;
	}
}
</style>
