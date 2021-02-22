import cuid from 'cuid';
import { flatten, uniq } from 'ramda';

const initialState = {
	name: '',
	color: '#59B750',
	cards: [],
};

const getters = {
	currentDeck: state => state,
	cards: state => state.cards,
	colorsUsed: state => uniq(flatten(state.cards.map(c => c.zones.map(z => z.color)))),
};

const actions = {
	updateDeckName({ commit }, payload) {
		commit('updateDeckName', payload);
	},
	updateDeckColor({ commit }, payload) {
		commit('updateDeckColor', payload);
	},
	addCardsToDeck({ commit }, payload) {
		commit('addCardsToDeck', payload);
	},
	updateCardsInDeck({ commit }, payload) {
		commit('updateCardsInDeck', payload);
	},
	deleteCardsFromDeck({ commit }, payload) {
		commit('deleteCardsFromDeck', payload);
	},
};

const mutations = {
	updateDeckName(state, payload) {
		state.name = payload;
	},
	updateDeckColor(state, payload) {
		state.color = payload;
	},
	updateCardsInDeck(state, payload) {
		const index = state.cards.findIndex(c => c.id === payload.id);
		if (index) {
			state.cards.splice(index, 1, JSON.parse(JSON.stringify(payload)));
		} else {
			const id = cuid();
			// deep clone
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
			const newCard = Object.assign({}, { id }, JSON.parse(JSON.stringify(payload)));
			state.cards.push(newCard);
		}
	},
	addCardsToDeck(state, payload) {
		const id = cuid();
		// deep clone
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
		const newCard = Object.assign({}, JSON.parse(JSON.stringify(payload)), { id });
		state.cards.push(newCard);
	},
	deleteCardsFromDeck(state, payload) {
		const index = state.cards.findIndex(c => c.id === payload.id);
		if (index !== -1) state.cards.splice(index, 1);
	},
};

export default {
	state: initialState,
	getters,
	actions,
	mutations,
};
