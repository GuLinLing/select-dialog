import Vue from 'vue'
import VueI18n from 'vue-i18n'
import getQuery from './../utils/query'
import autoLocale from './../utils/locale'
import en from './en'
import zh from './zh'
Vue.use(VueI18n)
let locale = getQuery('locale') || autoLocale
const i18n = new VueI18n({
  locale,
  messages: {
    zh,
    en
  }
})
export default i18n
