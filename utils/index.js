import getCookie from './cookie'
export function getUserId () {
  return (getCookie('UCSSSOUser') || getCookie('PORTALSSOUser') || getCookie('ZTEDPGSSOUser'))
}
export function getToken () {
  return (getCookie('UCSSSOToken') || getCookie('PORTALSSOCookie') || getCookie('ZTEDPGSSOCookie'))
}
