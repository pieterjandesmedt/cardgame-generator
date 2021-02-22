import cuid from 'cuid';

const initialState = {
	id: null,
	zones: [],
};

const initialZone = {
	valueType: 'number',
	values: '',
	text: '',
	color: '#0095FF'
};

const getters = {
	currentCard: state => state,
	currentZones: state => state.zones,
	currentZonesWithValues: state => state.zones.filter(z => z.values),
	currentValues: state => state.zones.map(z => z.values
		.split(',')
		.filter(n => n)),
};

const actions = {
	addZone({ commit }) {
		commit('addZone');
	},

	deleteZone({ commit }, payload) {
		commit('deleteZone', payload);
	},

	updateZone({ commit }, payload) {
		commit('updateZone', payload);
	},

	setCard({ commit }, payload) {
		commit('setCard', payload);
	},

	resetCard({ commit }) {
		commit('setCard', initialState);
	}
};

const mutations = {
	addZone(state) {
		const id = cuid();
		const newZone = Object.assign({}, { id }, initialZone);
		state.zones.push(newZone);
	},

	deleteZone(state, zone) {
		state.zones.splice(state.zones.findIndex(z => z.id === zone.id), 1);
	},

	updateZone(state, zone) {
		state.zones.splice(state.zones.findIndex(z => z.id === zone.id), 1, zone);
	},

	setCard(state, card) {
		Object.assign(state, JSON.parse(JSON.stringify(card)));
	}
};

export default {
	state: initialState,
	getters,
	actions,
	mutations
};
