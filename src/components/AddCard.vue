<template>
	<div>
		<h3 v-if="currentCard.id">Edit card set | <span @click="resetCard" class="link">New card set</span></h3>
		<h3 v-else>New card set</h3>
		<card-zone v-for="zone in currentCard.zones" :key="zone.id" :zone="zone"></card-zone>
		<el-button class="button" icon="el-icon-circle-plus" @click="addZone">Add zone</el-button>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import CardZone from './CardZone.vue';

	export default {
		components: { CardZone },
		computed: {
			...mapGetters(['currentCard']),
		},
		methods: {
			...mapActions(['addZone', 'resetCard']),
		}
	};
</script>

<style scoped>
	.link {
		color: #409EFF;
		cursor: pointer;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
