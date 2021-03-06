import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
// import decks from './modules/decks';
// import currentDeck from './modules/currentDeck';
// import currentCardSet from './modules/currentCardSet';
import cuid from 'cuid';

Vue.use(Vuex);

const DEBUG = process.env.NODE_ENV === 'development';

// const initialCardSet = {
// 	zones: [],
// };

const initialZone = {
	values: '',
	text: '',
	color: '#009CE0',
};

export default new Vuex.Store({
	state: {
		name: '',
		ratio: 'is-3by4',
		size: 20,
		color: '#009CE0',
		cardSets: [],
		editingCardSetId: '',
	},
	mutations: {
		setDeck(state, payload) {
			if (payload.deck) {
				const { name, ratio, size, color, cardSets } = payload.deck;
				this.state.name = name;
				this.state.ratio = ratio;
				this.state.size = size;
				this.state.color = color;
				this.state.cardSets.splice(0, this.state.cardSets.length, ...cardSets);
			}
		},
		updateDeckName(state, payload) {
			state.name = payload;
		},
		updateDeckColor(state, payload) {
			state.color = payload.hex;
		},
		addCardSetToDeck(state, payload) {
			state.cardSets.push(payload);
		},
		deleteCardSetFromDeck(state, payload) {
			const index = state.cardSets.findIndex(cardSet => cardSet.id === payload);
			console.log('index:', index);
			if (index !== -1) state.cardSets.splice(index, 1);
			if (payload === state.editingCardSetId) state.editingCardSetId = '';
			console.log('state:', state);
		},
		addZone(state) {
			const newZone = Object.assign({}, { id: cuid() }, initialZone);
			const currentCardSet = state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId);
			currentCardSet.zones.push(newZone);
		},
		updateZone(state, zone) {
			const currentCardSet = state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId);
			currentCardSet.zones.splice(
				currentCardSet.zones.findIndex(z => z.id === zone.id),
				1,
				zone,
			);
		},
		deleteZone(state, id) {
			console.log('zone:', id);
			console.log('state.zones:', state.zones);
			const currentCardSet = state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId);
			currentCardSet.zones.splice(
				currentCardSet.zones.findIndex(z => z.id === id),
				1,
			);
		},
		setEditingCardSetId(state, payload) {
			state.editingCardSetId = payload;
		},
		setCardRatio(state, payload) {
			state.ratio = payload;
		},
		setCardSize(state, payload) {
			try {
				state.size = parseInt(payload, 10);
			} catch (err) {
				console.error('Error parsing card size:', err);
			}
		},
	},
	actions: {
		setDeck({ commit }, payload) {
			commit('setDeck', payload);
		},
		updateDeckName({ commit }, payload) {
			commit('updateDeckName', payload);
		},
		updateDeckColor({ commit }, payload) {
			commit('updateDeckColor', payload);
		},
		addNewCardSetToDeck({ commit, dispatch }) {
			const id = cuid();
			dispatch('addCardSetToDeck', { id, zones: [] });
			commit('setEditingCardSetId', id);
		},
		addCardSetToDeck({ commit }, payload) {
			commit('addCardSetToDeck', payload);
		},
		deleteCardSetFromDeck({ commit }, id) {
			commit('deleteCardSetFromDeck', id);
		},
		addZone({ commit, dispatch, state }) {
			console.log('state:', state);
			console.log('state.editingCardSetId:', state.editingCardSetId);
			if (!state.editingCardSetId || !state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId))
				dispatch('addNewCardSetToDeck');
			commit('addZone');
		},
		updateZone({ commit }, payload) {
			commit('updateZone', payload);
		},
		deleteZone({ commit }, payload) {
			commit('deleteZone', payload);
		},
		setEditingCardSetId({ commit }, id) {
			commit('setEditingCardSetId', id);
		},
		setCardRatio({ commit }, ratio) {
			commit('setCardRatio', `is-${ratio.replaceAll(' ', '')}`);
		},
		setCardSize({ commit }, size) {
			commit('setCardSize', size);
		},
	},
	getters: {
		currentDeck: state => state,
		currentCardSet: state => state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId),
		currentZonesWithValues: state =>
			state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId)
				? state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId).zones.filter(z => z.values)
				: [],
		currentValues: state =>
			state.cardSets.find(cardSet => cardSet.id === state.editingCardSetId)
				? state.cardSets
						.find(cardSet => cardSet.id === state.editingCardSetId)
						.zones.map(z => z.values.split(',').filter(n => n))
				: [],
	},
	strict: DEBUG,
	// plugins: [
	// 	createPersistedState({
	// 		key: 'cardgames-generator',
	// 	}),
	// ],
});
