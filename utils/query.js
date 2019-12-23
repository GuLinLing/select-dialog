export default function (name, href = window.location.href) {
  let matchResult = href.match(new RegExp('[?&]' + name + '=([^&#]+)'));
  if (matchResult) {
    return decodeURIComponent(matchResult[1]);
  }
  return '';
}
