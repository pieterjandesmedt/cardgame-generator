<template>
	<b-notification type="is-white" class="card-zone pb-3" @close="deleteZone(zone)">
		<form label-width="60px">
			<b-field horizontal label="Text">
				<b-input placeholder="Zone text" :value="zone.text" @input="updateZoneText"></b-input>
			</b-field>
			<b-field horizontal label="Values">
				<b-input
					type="textarea"
					autosize
					placeholder="Comma separated values"
					:value="zone.values"
					@input="updateZoneValues"
				></b-input>
			</b-field>
			<b-field horizontal label="Color">
				<color-picker :value="zone.color" @input="updateZoneColor"></color-picker>
			</b-field>
		</form>
	</b-notification>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ColorPicker from '@/components/ColorPicker.vue';

export default {
	props: ['zone'],
	components: { ColorPicker },
	computed: {
		...mapGetters(['colorsUsed']),
	},
	methods: {
		...mapActions(['updateZone', 'deleteZone']),
		updateZoneText(value) {
			this.updateZone(Object.assign({}, this.zone, { text: value }));
		},
		updateZoneColor(value) {
			this.updateZone(Object.assign({}, this.zone, { color: value.hex }));
		},
		updateZoneValues(value) {
			this.updateZone(Object.assign({}, this.zone, { values: value }));
		},
	},
};
</script>

<style scoped>
.card-zone {
	border: 1px dashed lightgrey;
	border-radius: 8px;
	padding: 2.5rem 1rem 0;
	margin-bottom: 1rem;
	position: relative;
}
</style>
<style>
button.b-button--mini.is-circle {
	border-radius: 50%;
	padding: 5px;
	position: absolute;
	right: 1rem;
	top: 0.75rem;
}

.el-color-predefine__color-selector {
	display: inline-block;
	height: 20px;
	width: 20px;
	margin-right: 5px;
	cursor: pointer;
}

.el-color-predefine__color-selector > div {
	height: 100%;
	width: 100%;
	border-radius: 2px;
}
</style>
