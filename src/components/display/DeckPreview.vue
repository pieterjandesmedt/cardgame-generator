<template>
	<div class="deck-preview">
		<div class="deck-properties">
			<b-field label="Ratio">
				<b-select v-model="cardRatio">
					<option v-for="ratio in ratios" :key="ratio" :value="ratio">{{ ratio }}</option>
				</b-select>
			</b-field>
			<b-field label="Size" class="my-5">
				<b-slider :min="10" :max="50" indicator ticks v-model="cardSize"> </b-slider>
			</b-field>
		</div>
		<div class="deck-bar">
			<b-field label="Deck name">
				<b-input :value="deck.name" placeholder="Deck name" @input="updateDeckName"></b-input>
			</b-field>
			<b-field label="Deck back color">
				<color-picker :value="deck.color" @input="updateDeckColor"></color-picker>
			</b-field>
			<b-field
				label="Download as JSON"
				v-if="deck && deck.cardSets.map(c => c.zones.length).reduce((p, c) => p + c, 0) > 0"
			>
				<download :data="toDownload()" :name="deckNameToSlug()">Download Deck</download>
			</b-field>
		</div>
		<div class="card-sets my-3" v-if="deck.cardSets.filter(c => numberOfCards(c) > 0).length > 0">
			<b-notification
				class="card-set mr-1"
				v-for="cardSet in deck.cardSets.filter(c => numberOfCards(c) > 0)"
				:key="cardSet.id"
				@close="deleteCardSetFromDeck(cardSet.id)"
				@click.native="setEditingCardSetId(cardSet.id)"
			>
				<div class="card-container" v-for="c in numberOfCards(cardSet)" :key="c" :style="stackStyle(c)">
					<card :zones="currentZonesWithValues(cardSet)" :values="values(cardSet)[c - 1]"></card>
				</div>
			</b-notification>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { flatten, xprod, pick } from 'ramda';
import cuid from 'cuid';
import ColorPicker from '@/components/ColorPicker.vue';
import Card from './Card.vue';
import Download from './../Download.vue';

function flattenIfNeeded(item) {
	if (typeof item === 'string') return [item];
	return flatten(item);
}

/* eslint-disable */
function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}
/* eslint-enable */

const ratios = ['1 by 1', '5 by 4', '4 by 3', '3 by 2', '5 by 3', '4 by 5', '3 by 4', '2 by 3', '3 by 5'];

export default {
	components: {
		Card,
		Download,
		ColorPicker,
	},
	props: ['deck'],
	data() {
		return {
			ratios,
		};
	},
	computed: {
		...mapGetters(['currentCardSet']),
		...mapState(['ratio', 'size']),
		cardRatio: {
			get() {
				return this.ratio.replace('is-', '').replace('by', ' by ');
			},
			set(value) {
				this.setCardRatio(value);
			},
		},
		cardSize: {
			get() {
				return this.size;
			},
			set(value) {
				this.setCardSize(value);
			},
		},
	},
	methods: {
		...mapActions([
			'setCardRatio',
			'setCardSize',
			'setCardSet',
			'deleteCardSetFromDeck',
			'setEditingCardSetId',
			'updateDeckName',
			'updateDeckColor',
		]),
		numberOfCards(card) {
			return this.currentZonesWithValues(card) && this.currentZonesWithValues(card).length > 0
				? this.currentZonesWithValues(card)
						.map(z => z.values.split(',').filter(n => n).length)
						.reduce((p, c) => p * c, 1)
				: 0;
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
			this.deck.cardSets.forEach(cardSet => {
				for (let index = 0; index < this.numberOfCards(cardSet); index++) {
					const zoneValues = this.values(cardSet)[index];
					const zones = this.currentZonesWithValues(cardSet).map(pick(['text', 'color']));
					zones.forEach((zone, i) => {
						zone.value = zoneValues[i];
						if (!zone.text) delete zone.text;
					});
					const newCard = Object.assign({}, { id: cuid(), zones: JSON.parse(JSON.stringify(zones)) });
					allCards.push(newCard);
				}
			});
			return allCards;
		},
		deckNameToSlug() {
			return slugify(this.deck.name);
		},
		toDownload() {
			const cleanDeck = JSON.parse(JSON.stringify(this.deck));
			cleanDeck.cardSets = cleanDeck.cardSets.filter(c => this.numberOfCards(c) > 0);
			return {
				deck: cleanDeck,
				cards: this.generateCards(),
			};
		},
		stackStyle(index) {
			index = index - 1;
			const slider = 20;
			// 0 => 0,
			// 20 => 20,
			// >=40 => 0
			const sliderToTriangle = Math.max(0, 20 - Math.abs(20 - slider));
			const rotateZ =
				(((index - Math.floor(this.numberOfCards / 2)) / (this.numberOfCards || 1)) * sliderToTriangle) / 4;
			return {
				'z-index': 1000 - index,
				transform: `rotateZ(${rotateZ}deg)`,
				'margin-left': index ? `calc(-${this.size}em + ${slider / 10}em)` : 0,
				transition: 'transform  150ms ease-in-out, margin 150ms ease-in-out',
				width: `${this.size}em`,
			};
		},
	},
};
</script>

<style lang="scss">
.card-sets {
	transform: scale(0.5) translate(-50%, -50%);
	width: 200%;
	margin-bottom: -10em !important;
}

.deck-preview .card-set {
	display: inline-block;
	cursor: pointer;
}

.deck-preview .card-container {
	position: relative;
	display: inline-block;
	&:hover {
		z-index: 1000 !important;
		transform: translateY(-1em);
	}
}
</style>
