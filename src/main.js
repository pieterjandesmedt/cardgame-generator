// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Row, Col, Form, Card, Button, FormItem, Input, ColorPicker, Main, Container } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import '../theme/index.css';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// configure language
locale.use(lang);

Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Card);
Vue.use(Button);
Vue.use(Input);
Vue.use(ColorPicker);
Vue.use(Main);
Vue.use(Container);


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>',
});
