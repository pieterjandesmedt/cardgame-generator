import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import decks from './modules/decks';
import currentDeck from './modules/currentDeck';
import currentCard from './modules/currentCard';

Vue.use(Vuex);

const DEBUG = process.env.NODE_ENV === 'development';

export default new Vuex.Store({
	modules: {
		currentDeck,
		currentCard,
		decks,
	},
	strict: DEBUG,
	plugins: [createPersistedState({
		key: 'cardgames-generator'
	})],
});
