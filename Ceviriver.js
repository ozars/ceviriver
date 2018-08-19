/* global AjaxRequest, DebugInfo */

class Ceviriver {
  constructor() {
    this.host = document.location.host;
    this.path = document.location.path;
    this.repo = this.repoURL();
    if (this.repo === null) {
      throw Error("Couldn't find repo for " + document.location);
    }
  }

  repoURL() {
    if (this.host.match(/(^|.*\.)freecodecamp.org/)) {
      return "https://raw.github.com/ozars/ceviriver-freecodecamp/";
    }
    return null;
  }

  buildTranslationPath() {
    let path = this.path;
    if (path[path.length - 1] == '/') {
      path += "index";
    }
    path += ".json";
    return this.repo + this.host + path;
  }

  fetchTranslations() {
    return AjaxRequest.getJSON(this.buildTranslationPath());
  }

  run() {
    let translations = this.fetchTranslations();
    DebugInfo.log(translations);
  }

}
