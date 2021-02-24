import cuid from 'cuid';

const initialState = {
	zones: [],
};

const initialZone = {
	values: '',
	text: '',
	color: '#009CE0',
};

const getters = {
	currentZonesWithValues: state => state.zones.filter(z => z.values),
	currentValues: state => state.zones.map(z => z.values.split(',').filter(n => n)),
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

	setCardSet({ commit }, payload) {
		commit('setCardSet', payload);
	},

	resetCard({ commit }) {
		commit('setCardSet', initialState);
	},
};

const mutations = {
	addZone(state) {
		const newZone = Object.assign({}, { id: cuid() }, initialZone);
		state.zones.push(newZone);
	},

	deleteZone(state, id) {
		console.log('zone:', id);
		console.log('state.zones:', state.zones);
		state.zones.splice(
			state.zones.findIndex(z => z.id === id),
			1,
		);
	},

	updateZone(state, zone) {
		console.log('zone:', zone);
		state.zones.splice(
			state.zones.findIndex(z => z.id === zone.id),
			1,
			zone,
		);
	},

	setCardSet(state, cardSet) {
		console.log('cardSet:', cardSet);
		Object.assign(state, JSON.parse(JSON.stringify(cardSet)));
	},
};

export default {
	state: initialState,
	getters,
	actions,
	mutations,
};
