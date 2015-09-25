/* */ 
'use strict';
exports.__esModule = true;
exports.routerDidChange = routerDidChange;
exports.replaceRoutes = replaceRoutes;
exports.historyAPI = historyAPI;
var _constants = require("./constants");
function routerDidChange(state) {
  return {
    type: _constants.ROUTER_DID_CHANGE,
    payload: state
  };
}
function replaceRoutes(routes) {
  return {
    type: _constants.REPLACE_ROUTES,
    payload: routes
  };
}
function historyAPI(method) {
  return function() {
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return {
      type: _constants.HISTORY_API,
      payload: {
        method: method,
        args: args
      }
    };
  };
}
var pushState = historyAPI('pushState');
exports.pushState = pushState;
var replaceState = historyAPI('replaceState');
exports.replaceState = replaceState;
var setState = historyAPI('setState');
exports.setState = setState;
var go = historyAPI('go');
exports.go = go;
var goBack = historyAPI('goBack');
exports.goBack = goBack;
var goForward = historyAPI('goForward');
exports.goForward = goForward;
