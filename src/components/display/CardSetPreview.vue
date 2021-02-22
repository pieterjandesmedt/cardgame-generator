<template>
	<div class="card-set-preview">
		<div v-if="numberOfCards() > 0">
			<h3>Card preview</h3>
			<div v-if="currentCard.id">
				<el-button type="primary" @click="updateCardsInDeck(currentCard)">Update this set in the deck</el-button>
				<el-button @click="addCardsToDeck(currentCard)">Add these {{ numberOfCards() }} as new cards</el-button>
			</div>
			<div v-else>
				<el-button type="primary" @click="addCardsToDeck(currentCard)">Add these {{ numberOfCards() }} cards to deck</el-button>
			</div>
		</div>
		<el-row :gutter="20">
			<el-col :span="8" class="card-container" v-for="c in numberOfCards()" :key="c">
				<div class="extra-container">
					<card :zones="currentZonesWithValues" :values="values()[c - 1]"></card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
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
			...mapGetters(['currentCard', 'currentZonesWithValues', 'currentValues']),
		},
		methods: {
			...mapActions(['addCardsToDeck', 'updateCardsInDeck']),
			numberOfCards() {
				return this.currentZonesWithValues && this.currentZonesWithValues.length > 0 ?
					this.currentZonesWithValues
						.map(z => z.values
							.split(',')
							.filter(n => n)
							.length)
						.reduce(multiply, 1) :
					0;
			},
			values() {
				return this.currentZonesWithValues
					.map(zone => zone.values.split(',').filter(n => n))
					.reduce(xprod)
					.map(flattenIfNeeded);
			},
		},
	};
</script>

<style>
	.card-set-preview .card-container {
		height: 0;
		padding-top: 46.6666%;
		position: relative;
	}

	.extra-container {
		position: absolute;
		height: calc(100% - 20px);
		width: calc(100% - 20px);
		top: 10px;
		left: 10px;
	}
</style>
