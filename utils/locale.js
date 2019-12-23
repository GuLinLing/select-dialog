function getBrowserLang () {
  let locale = null
  if (navigator.languages) {
    locale = navigator.languages[0].toLocaleLowerCase()
  } else {
    locale = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage).toLocaleLowerCase()
  }
  if (~locale.indexOf('zh')) {
    locale = 'zh'
  } else if (~locale.indexOf('en')) {
    locale = 'en'
  } else {
    locale = 'zh'
  }
  return locale
}
export default getBrowserLang()
