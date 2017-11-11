import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './messages'

Vue.use(VueI18n)

Vue.prototype.$changeLang = function (lang){
  this.$i18n.locale = lang;
  window.localStorage.setItem('lang_app',lang);
}

const lang = new VueI18n({
  locale: window.localStorage.getItem('lang_app') || 'ru',
  fallbackLocale: 'ru',
  messages
});

export default lang;