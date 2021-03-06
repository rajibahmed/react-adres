/* */ 
'use strict';
exports.__esModule = true;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _createUncontrollable = require("./createUncontrollable");
var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);
var mixin = {shouldComponentUpdate: function shouldComponentUpdate() {
    return !this._notifying;
  }};
function set(component, propName, handler, value, args) {
  if (handler) {
    component._notifying = true;
    handler.call.apply(handler, [component, value].concat(args));
    component._notifying = false;
  }
  component._values[propName] = value;
  component.forceUpdate();
}
exports['default'] = _createUncontrollable2['default']([mixin], set);
module.exports = exports['default'];
