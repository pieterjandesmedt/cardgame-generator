export default {
	getWorld() {
		return new Promise(resolve =>
			setTimeout(
				() => resolve('world'),
				1000
			));
	}
};
