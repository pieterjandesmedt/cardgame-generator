<template>
	<div v-if="currentDeck.cards.length > 0 || decks.length > 0" class="decks">
		<h3>Deck preview</h3>
		<deck-preview :deck="currentDeck"></deck-preview>
		<div v-for="deck in decks" :key="deck.id">
			<deck-preview :deck="deck"></deck-preview>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import DeckPreview from './display/DeckPreview.vue';

	export default {
		components: { DeckPreview },
		computed: {
			...mapGetters(['currentDeck', 'decks'])
		}
	};

</script>

<style>
</style>
