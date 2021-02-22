<template>
	<div class="hello">
		<el-container>
			<el-main>
				<decks></decks>
				<el-row :gutter="20">
					<el-col :span="12">
						<add-card></add-card>
					</el-col>
					<el-col :span="12">
						<card-set-preview></card-set-preview>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import AddCard from './AddCard.vue';
	import CardSetPreview from './display/CardSetPreview.vue';
	import Decks from './Decks.vue';

	export default {
		components: {
			AddCard, CardSetPreview, Decks
		},
	};
</script>

