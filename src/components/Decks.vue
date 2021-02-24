<template>
	<div v-if="currentDeck && currentDeck.cardSets.length > 0" class="decks">
		<h3 class="is-size-4 mt-4">Deck preview</h3>
		<deck-preview :deck="currentDeck"></deck-preview>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import DeckPreview from './display/DeckPreview.vue';

export default {
	components: { DeckPreview },
	computed: {
		...mapGetters(['currentDeck']),
	},
};
</script>

<style></style>
