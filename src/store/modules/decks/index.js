import cuid from 'cuid';

const initialState = {
	decks: [],
};

const getters = {
	decks: state => state.decks,
};

const actions = {
	addDeckToDecks({ commit }, payload) {
		commit('addDeckToDecks', payload);
	},
};
const mutations = {
	addDeckToDecks(state, payload) {
		if (payload.id) {
			state.decks.splice(
				state.decks.findIndex(c => c.id === payload.id),
				1,
				payload,
			);
		} else {
			const id = cuid();
			// deep clone
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
			const newDeck = Object.assign({}, { id }, JSON.parse(JSON.stringify(payload)));
			state.decks.push(newDeck);
		}
	},
};

export default {
	state: initialState,
	getters,
	actions,
	mutations,
};
