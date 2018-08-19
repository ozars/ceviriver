'use strict';

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
    let host = this.host;
    if (host[host.length - 1] == '/') {
      host += "index";
    }
    host += ".json";
    return this.repo + this.host + host;
  }

  fetchTranslations() {
    return CeviriverUtility.getJSON(buildTranslationPath);
  }

  run() {
    let translations = this.fetchTranslations();
    debugInfo.log(translations);
  }

}
