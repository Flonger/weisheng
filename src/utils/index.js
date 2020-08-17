import $md5 from 'js-md5'
export function $scrollAnimation (element, speed, sign) {
  if (typeof window.requestAnimationFrame === 'function') {
    if (location.href.indexOf(sign.slice(1, sign.length)) !== -1) {
      return false
    }
    let rect = element.getBoundingClientRect()
    // 获取元素相对窗口的top值，此处应加上窗口本身的偏移
    let top = window.pageYOffset + rect.top
    let currentTop = 0
    let requestId
    // 采用requestAnimationFrame，平滑动画
    const step = function (timestamp) {
      currentTop += speed
      if (currentTop <= top) {
        window.scrollTo({ top: currentTop,
          behavior: 'smooth' })
        requestId = window.requestAnimationFrame(step)
      } else {
        window.cancelAnimationFrame(requestId)
      }
    }
    window.requestAnimationFrame(step)
  } else {
    return false
  }
}
export function sortEncrypt(obj) {
  let newKey = Object.keys(obj).sort();
  let newObj = {

  };
  for (let i = 0, len = newKey.length; i < len; i++){
    newObj[newKey[i]] = obj[newKey[i]]
  }
  let STR = '';
  for (let i in newObj){
    STR += i+'='+newObj[i]+'|'
  }
  return STR.substr(0, STR.length-1)
}
export function md5Encrypt(params) {
  return $md5("Ig3Ne7LGPN2HrjAlCZwxcsIpi2eA9tOXyUVIsWnmhDQrE3ZmyEhMBQulQBfRF5mK"+sortEncrypt(params))
}
export function GetRequest() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
export  function template(str) {
  var fn = new Function("obj",

    "var p = []; with(obj){p.push('" +

    str
      .replace(/[\r\t\n]/g, "")
      .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
      .replace(/<%/g, "');")
      .replace(/%>/g,"p.push('")
    + "');}return p.join('');");

  var template = function(data) {
    return fn.call(this, data)
  };
  return template;
}
