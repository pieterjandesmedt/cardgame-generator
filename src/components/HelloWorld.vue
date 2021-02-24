<template>
	<div class="container is-fluid">
		<h1 class="is-size-3 mt-4">Card deck generator</h1>
		<decks></decks>
		<div class="columns mt-4">
			<div class="column is-one-third-widescreen is-one-quarter-fullhd">
				<add-card-set></add-card-set>
			</div>
			<div class="column">
				<card-set-preview></card-set-preview>
			</div>
		</div>
	</div>
</template>

<script>
import AddCardSet from './AddCardSet.vue';
import CardSetPreview from './display/CardSetPreview.vue';
import Decks from './Decks.vue';

export default {
	components: {
		AddCardSet,
		CardSetPreview,
		Decks,
	},
};
</script>
