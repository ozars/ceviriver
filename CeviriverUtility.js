
class AjaxRequest {
  static getAsyncJSON(url) {
    return new Promise((resolve, reject) => {
      GM.xmlHttpRequest({
        'method' : 'GET',
        'url' : url,
        'responseType' : 'json',
        'onload' : (response) => { resolve(response); },
        'onerror' : (response) => { reject(response); }
      });
    });
  }

  static async getJSON(url) {
    let response = await AjaxRequest.getAsyncJSON(url);
    return response;
  }
}

/* This class is used to pass debug information to browser console. */
class _DebugInfo {
  constructor() {
    /* Errors will be stacked in this variable for inspection. */
    this.errorStack = [];
  }

  /* Utility function to get last error thrown. */
  get lastError() {
    if (this.errorStack.length == 0) {
      return null;
    }
    return this.errorStack[this.errorStack.length - 1];
  }

  /* Prints error message and returns error. Useful for throwing it agian. */
  error(msg, error) {
    if (msg === undefined) {
      msg = "[Ceviriver][No error message]";
    } else {
      msg = "[Ceviriver] " + msg;
    }
    if (error !== undefined) {
      msg += ": " + error;
    }
    console.error(msg);
    this.errorStack.push(error);
    return error;
  }

  /* Usual logging. */
  log(msg) {
    console.log(msg);
  }
}

/* Singleton for debug information. */
const DebugInfo = _DebugInfo();
