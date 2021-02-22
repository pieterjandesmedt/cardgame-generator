<template>
	<div class="deck-preview">
		<el-form class="deck-bar" :inline="true">
			<el-form-item>
				<el-input :value="deck.name" placeholder="Deck name" @input="updateDeckName"></el-input>
			</el-form-item>
			<el-form-item>
				<el-color-picker :value="deck.color" @input="updateDeckColor"></el-color-picker>
			</el-form-item>
			<el-form-item>
				<download :data="toDownload()" :name="deckNameToSlug()">Download Deck</download>
			</el-form-item>
		</el-form>
		<div class="card-sets">
			<div class="card-set" v-for="(card, index) in deck.cards" :key="card.id" :style="`z-index: ${deck.cards.length - index}`"
				@click="setCard(card)" :class="{ editing: currentCard.id === card.id }">
				<div class="card-container" v-for="c in numberOfCards(card)" :key="c">
					<card :zones="currentZonesWithValues(card)" :values="values(card)[c - 1]" :style="`z-index: ${numberOfCards(card) + 1 - c}`"></card>
				</div>
				<el-button class="set-delete" type="danger" icon="el-icon-delete" circle size="mini" @click="deleteCardsFromDeck(card)"></el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import { flatten, xprod, pick } from 'ramda';
	import Card from './Card.vue';
	import Download from './../Download.vue';

	function flattenIfNeeded(item) {
		if (typeof item === 'string') return [item];
		return flatten(item);
	}

	/* eslint-disable */
	function slugify(text) {
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
	}
	/* eslint-enable */

	export default {
		components: {
			Card, Download
		},
		props: ['deck'],
		computed: {
			...mapGetters(['currentCard'])
		},
		methods: {
			...mapActions(['setCard', 'deleteCardsFromDeck', 'updateDeckName', 'updateDeckColor']),
			numberOfCards(card) {
				return this.currentZonesWithValues(card) && this.currentZonesWithValues(card).length > 0 ?
					this.currentZonesWithValues(card)
						.map(z => z.values
							.split(',')
							.filter(n => n)
							.length)
						.reduce((p, c) => p * c, 1) :
					0;
			},
			values(card) {
				return this.currentZonesWithValues(card)
					.map(zone => zone.values.split(',').filter(n => n))
					.reduce(xprod)
					.map(flattenIfNeeded);
			},
			currentZonesWithValues(card) {
				return card.zones.filter(z => z.values);
			},
			generateCards() {
				const allCards = [];
				let id = 0;
				this.deck.cards.forEach((card) => {
					for (let index = 0; index < this.numberOfCards(card); index++) {
						const zoneValues = this.values(card)[index];
						const zones = this.currentZonesWithValues(card).map(pick(['text', 'color']));
						zones.forEach((zone, i) => {
							zone.value = zoneValues[i];
							if (!zone.text) delete zone.text;
						});
						const newCard = Object.assign({}, { id, zones: JSON.parse(JSON.stringify(zones)) });
						allCards.push(newCard);
						id++;
					}
				});
				return allCards;
			},
			deckNameToSlug() {
				return slugify(this.deck.name);
			},
			toDownload() {
				return {
					deck: this.deck,
					cards: this.generateCards(),
				};
			}
		},
	};
</script>

<style>
	.el-form--inline .el-form-item {
		margin-bottom: 0;
	}

	.card-sets {
		white-space: nowrap;
		overflow: auto;
		padding-bottom: 3em;
	}

	.deck-preview .card-set {
		display: inline-block;
		position: relative;
		transform: translateY(0);
		transition: transform 150ms;
		cursor: pointer;
	}

	.deck-preview .card-set .set-delete {
		opacity: 0;
		right: 0;
		top: -1.5rem;
		transition: opacity 150ms;
	}

	.deck-preview .card-set.editing {
		transform: translateY(0.5em);
	}

	.deck-preview .card-set:hover {
		transform: translateY(2em);
		z-index: 9999 !important;
	}

	.deck-preview .card-set:hover .set-delete {
		opacity: 1;
	}

	.deck-preview .card-set + .card-set {
		position: relative;
		margin-left: calc(-125px + 2.2em);
	}

	.deck-preview .card-container {
		scale: 0.5;
		width: 125px;
		height: 0;
		padding-top: 175px;
		position: relative;
		font-size: 60%;
		display: inline-block;
	}

	.deck-preview .card-container + .card-container {
		margin-left: calc(-125px + 1.5em);
	}
</style><style scoped>
	.set-delete {
	}
</style>

