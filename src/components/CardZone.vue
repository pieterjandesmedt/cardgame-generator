<template>
	<div class="card-zone">
		<el-form label-width="60px">
			<el-form-item label="Text">
				<el-input type="textarea" autosize placeholder="Zone text" :value="zone.text" @input="updateZoneText"></el-input>
			</el-form-item>
			<el-form-item label="Values">
				<el-input placeholder="Comma separated values" :value="zone.values" @input="updateZoneValues"></el-input>
			</el-form-item>
			<el-form-item label="Color">
				<el-color-picker :value="zone.color" @change="updateZoneColor" :predefine="colorsUsed"></el-color-picker>
			</el-form-item>
		</el-form>
		<el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteZone(zone)"></el-button>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		props: ['zone'],
		computed: {
			...mapGetters(['colorsUsed']),
		},
		methods: {
			...mapActions(['updateZone', 'deleteZone']),
			updateZoneText(value) {
				this.updateZone(Object.assign({}, this.zone, { text: value }));
			},
			updateZoneColor(value) {
				this.updateZone(Object.assign({}, this.zone, { color: value }));
			},
			updateZoneValues(value) {
				this.updateZone(Object.assign({}, this.zone, { values: value }));
			}
		}
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
	button.el-button--mini.is-circle {
		border-radius: 50%;
		padding: 5px;
		position: absolute;
		right: 1rem;
		top: 0.75rem;
	}

	.el-form-item:last-child {
		margin-bottom: 0;
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

