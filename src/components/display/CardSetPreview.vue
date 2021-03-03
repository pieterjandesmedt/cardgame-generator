<template>
	<div class="card-set-preview">
		<h3 class="is-size-4" v-if="numberOfCards > 0">
			Card set preview <small class="is-size-7">{{ numberOfCards }} cards</small>
		</h3>
		<div class="card-container" v-for="c in numberOfCards" :key="c" :style="stackStyle(c)">
			<card :zones="currentZonesWithValues" :values="values()[c - 1]"></card>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { flatten, xprod } from 'ramda';
import Card from './Card.vue';

function multiply(p = 1, c = 1) {
	return p * c;
}

function flattenIfNeeded(item) {
	if (typeof item === 'string') return [item];
	return flatten(item);
}

export default {
	components: { Card },
	computed: {
		...mapGetters(['currentCardSet', 'currentZonesWithValues', 'currentValues']),
		...mapState(['ratio', 'size']),
		numberOfCards() {
			return this.currentZonesWithValues && this.currentZonesWithValues.length > 0
				? this.currentZonesWithValues.map(z => z.values.split(',').filter(n => n).length).reduce(multiply, 1)
				: 0;
		},
	},
	methods: {
		...mapActions(['addCardsToDeck', 'updateCardsInDeck']),
		values() {
			return this.currentZonesWithValues
				.map(zone => zone.values.split(',').filter(n => n))
				.reduce(xprod)
				.map(flattenIfNeeded);
		},
		stackStyle() {
			return {
				width: `${this.size}em`,
			};
		},
	},
};
</script>

<style lang="scss">
.card-set-preview .card-container {
	position: relative;
	display: inline-block;
	margin-right: 0.5em;
}
</style>
