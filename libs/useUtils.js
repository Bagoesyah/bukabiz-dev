export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteAllCookies() {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
  }
}

export function compress(string) {
  string = unescape(encodeURIComponent(string));
  var newString = '',
    char, nextChar, combinedCharCode;
  for (var i = 0; i < string.length; i += 2) {
    char = string.charCodeAt(i);

    if ((i + 1) < string.length) {


      nextChar = string.charCodeAt(i + 1) - 31;


      combinedCharCode = char + "" + nextChar.toLocaleString('en', {
        minimumIntegerDigits: 2
      });

      newString += String.fromCharCode(parseInt(combinedCharCode, 10));

    } else {


      newString += string.charAt(i);
    }
  }
  return btoa(unescape(encodeURIComponent(newString)));
}

export function decompress(string) {
  var newString = '',
    char, codeStr, firstCharCode, lastCharCode;
  string = decodeURIComponent(escape(atob(string)));
  for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    if (char > 132) {
      codeStr = char.toString(10);

      firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);

      lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;

      newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
    } else {
      newString += string.charAt(i);
    }
  }
  return newString;
}