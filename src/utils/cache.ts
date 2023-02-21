//浏览器本地缓存
class cache {
  setStorage(key: string, value: any, type = 'local') {
    if (type === 'local') {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else if (type === 'session') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('setStorage方法传入的type只能(local，session)！');
    }
  }

  getStorage(key: string, type = 'local') {
    let value;
    if (type === 'local') {
      value = window.localStorage.getItem(key);
    } else if (type === 'session') {
      value = window.sessionStorage.getItem(key);
    } else {
      console.error('getSession方法传入的type只能(local，session)！');
    }
    if (value) {
      return JSON.parse(value);
    }
  }

  remove(key: string, type = 'local') {
    if (type === 'local') {
      window.localStorage.removeItem(key);
    } else if (type === 'session') {
      window.sessionStorage.removeItem(key);
    } else {
      console.error('remove方法传入的type只能(local，session)！');
    }
  }

  clear(type = 'local') {
    if (type === 'local') {
      window.localStorage.clear();
    } else if (type === 'session') {
      window.sessionStorage.clear();
    } else {
      console.error('clear方法传入的type只能(local，session)！');
    }
  }
}

export default new cache();
