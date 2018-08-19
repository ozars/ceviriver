/* global AjaxRequest, DebugInfo */

class Ceviriver {
  constructor() {
    this.host = document.location.hostname;
    this.path = document.location.pathname;
    this.repo = this.repoURL();
    if (this.repo === null) {
      throw Error("Couldn't find repo for " + document.location);
    }
  }

  repoURL() {
    if (this.host.match(/(^|.*\.)freecodecamp.org/)) {
      return "https://raw.github.com/ozars/ceviriver-fcc/src/";
    }
    return null;
  }

  buildTranslationPath() {
    let path = this.path;
    if (path[path.length - 1] == '/') {
      path = path.substr(0, path.length - 1);
    }
    path += ".json";
    return this.repo + this.host + path;
  }

  async fetchTranslations() {
    return await AjaxRequest.getJSON(this.buildTranslationPath());
  }

  async run() {
    let translations = await this.fetchTranslations();
    DebugInfo.log(document.location);
    DebugInfo.log(translations);
  }

}
