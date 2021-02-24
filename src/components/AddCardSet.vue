<template>
	<div>
		<h3
			class="is-size-4"
			v-if="
				currentCardSet && currentCardSet.id && currentCardSet.zones.filter(z => z.text && z.values).length > 0
			"
		>
			Edit card set | <a @click.prevent="addNewCardSetToDeck">New card set</a>
		</h3>
		<h3 class="is-size-4" v-else>New card set</h3>
		<div v-if="currentCardSet">
			<card-zone v-for="zone in currentCardSet.zones" :key="zone.id" :zone="zone"></card-zone>
		</div>
		<b-button class="mt-3" icon="plus" @click="addZone">Add zone</b-button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardZone from './CardZone.vue';

export default {
	components: { CardZone },
	computed: {
		...mapGetters(['currentCardSet']),
	},
	methods: {
		...mapActions(['addZone', 'addNewCardSetToDeck']),
	},
};
</script>
