// ==UserScript==
// @name            Ceviriver
// @description     Translates websites with translation received from remote sources.
// @description:tr  Uzaktaki kaynaklardan alinan tercumelerle web sitelerini cevirir.
// @author          Omer Ozarslan <code@ozarslan.com>
// @namespace       https://github.com/ozars/ceviriver
// @downloadURL     https://raw.github.com/ozars/ceviriver/master/ceviriver.user.js
// @updateURL       https://raw.github.com/ozars/ceviriver/master/ceviriver.user.js
// @supportURL      https://github.com/ozars/ceviriver/issues
//
// @include         https://*.freecodecamp.org/*
// @include         https://freecodecamp.org/*
// @connect         raw.github.com
// @connect         raw.githubusercontent.com
// @grant           GM.getValue
// @grant           GM.setValue
// @grant           GM.xmlHttpRequest
// @grant           unsafeWindow
//
// @require         CeviriverUtility.js
// @require         Ceviriver.js
// @require         CeviriverDevel.js
// @version         1.0.0
// ==/UserScript==

/* global DebugInfo, Ceviriver, CeviriverDevel */

/* Don't run on frames or iframes. It sometimes causes multiple invocation. */
if (window.top != window.self) {
  return;
}

(async function() {
  'use strict';

  /* This key is used for storing value of development mode for developers as in
   * "Dinleyin ulan develler!". */
  const DEVEL_MODE_KEY = "devel";

  /* Pass debug information to unsafe window to access it from Web Console. */
  unsafeWindow.Ceviriver = DebugInfo;

  /* Application queries development mode. Then, it is bootstrapped. */
  GM.getValue(DEVEL_MODE_KEY, false)
    .then(
      (devMode) => {
        let app;

        try {
          if (devMode) {
            DebugInfo.log("Starting Ceviriver in development mode.");
            app = new CeviriverDevel();
          } else {
            app = new Ceviriver();
          }
        } catch(error) {
          throw DebugInfo.error("Couldn't create object", error);
        }

        try {
          app.run();
        } catch(error) {
          throw DebugInfo.error(
            "Unhandled exception in Ceviriver application", error
          );
        }
      }
    ).catch(
      (error) => {
        throw DebugInfo.error(
          "Couldn't get value of development mode setting", error
        );
      }
    );
})();
