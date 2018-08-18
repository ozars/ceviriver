// ==UserScript==
// @name            CeviriVer
// @description     Translates websites with translation received from remote sources.
// @description:tr  Uzaktaki kaynaklardan alinan tercumelerle web sitelerini cevirir.
// @author          Omer Ozarslan <code@ozarslan.com>
// @namespace       https://github.com/ozars/ceviriver
// @downloadURL     https://raw.github.com/ozars/ceviriver/master/ceviriver.user.js
// @updateURL       https://raw.github.com/ozars/ceviriver/master/ceviriver.user.js
// @license         Apache-2.0 https://www.apache.org/licenses/LICENSE-2.0
// @copyright       Copyright (C) 2018, by Omer Ozarslan <code@ozarslan.com>
//
// @include         https://*.freecodecamp.org/*
// @include         https://freecodecamp.org/*
// @grant           GM.getValue
// @grant           GM.setValue
// @grant           unsafeWindow
//
// @require         CeviriVer.js
// @require         CeviriVerDevel.js
// @version         1.0.2
// ==/UserScript==

(function() {
  'use strict';

  /* This key is used for storing value of development mode for developers as in
   * "Dinleyin ulan develler!". */
  const DEVEL_MODE_KEY = "devel";

  /* This class is used to pass debug information to browser console. */
  class DebugInfo {
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
        msg = "[No error message]";
      }
      if (error !== undefined) {
        msg += ": " + error;
      }
      console.error(msg);
      return error;
    }

    /* Usual logging. */
    log(msg) {
      console.log(msg);
    }
  }

  /* Create debug information object, and pass it to unsafe window to access
   * from Web Console. */
  const debugInfo = new DebugInfo();
  unsafeWindow.CeviriVer = debugInfo;

  /* Application queries development mode. Then, it is bootstrapped. */
  GM.getValue(DEVEL_MODE_KEY, false)
    .then(
      /* If successful... */
      (devMode) => {
        let app;

        try {
          if (devMode) {
            debugInfo.log("Starting CeviriVer in development mode.");
            app = new CeviriVerDevel();
          } else {
            app = new CeviriVer();
          }
        } catch(error) {
          throw debugInfo.error("Couldn't create object", error);
        }

        try {
          app.run();
        } catch(error) {
          throw debugInfo.error(
            "Unhandled exception in CeviriVer application", error
          );
        }
      },

      /* If failed... */
      (error) => {
        throw debugInfo.error(
          "Couldn't get value of development mode setting", error
        );
      }
  );
})();
