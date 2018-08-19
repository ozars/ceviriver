
class CeviriverUtility {
  static getAsyncJSON(url) {
    return new Promise(resolve => {
      GM.xmlHttpRequest({
        'method' : 'GET',
        'url' : url,
        'responseType' : 'json',
        'onload' : (response) => { resolve(response); },
        'onerror' : (response) => { resolve(response); }
      });
    });
  }

  static async getJSON(url) {
    return await Utility.getAsyncJSON(url);
  }
}
