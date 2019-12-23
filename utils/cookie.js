var getCookie = function (name) { // 获取cookie
  if (typeof document === 'undefined') {
    return ''
  }
  if (!name) {
    return document.cookie
  }
  var cookieName = encodeURIComponent(name) + '='
  var cookieStart = document.cookie.lastIndexOf(cookieName)
  var cookieValue = null
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
  }
  return cookieValue
}
export default getCookie
