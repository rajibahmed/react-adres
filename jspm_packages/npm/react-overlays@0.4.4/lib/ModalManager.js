/* */ 
'use strict';
exports.__esModule = true;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
var _domHelpersStyle = require("dom-helpers/style");
var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);
var _domHelpersClass = require("dom-helpers/class");
var _domHelpersClass2 = _interopRequireDefault(_domHelpersClass);
var _domHelpersUtilScrollbarSize = require("dom-helpers/util/scrollbarSize");
var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);
var _utilsIsOverflowing = require("./utils/isOverflowing");
var _utilsIsOverflowing2 = _interopRequireDefault(_utilsIsOverflowing);
var findContainer = function findContainer(data, modal) {
  var idx = -1;
  data.some(function(d, i) {
    if (d.modals.indexOf(modal) !== -1) {
      idx = i;
      return true;
    }
  });
  return idx;
};
function remove(arr, item) {
  var i = arr.indexOf(item);
  if (i !== -1) {
    arr.splice(i, 0);
  }
}
var ModalManager = (function() {
  function ModalManager() {
    _classCallCheck(this, ModalManager);
    this.modals = [];
    this.containers = [];
    this.data = [];
    this._listeners = [];
  }
  ModalManager.prototype.add = function add(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }
    var data = {
      modals: [modal],
      classes: className ? className.split(/\s+/) : [],
      style: {
        overflow: container.style.overflow,
        paddingRight: container.style.paddingRight
      }
    };
    var style = {overflow: 'hidden'};
    data.overflowing = _utilsIsOverflowing2['default'](container);
    if (data.overflowing) {
      style.paddingRight = parseInt(_domHelpersStyle2['default'](container, 'paddingRight') || 0, 10) + _domHelpersUtilScrollbarSize2['default']() + 'px';
    }
    _domHelpersStyle2['default'](container, style);
    data.classes.forEach(_domHelpersClass2['default'].addClass.bind(null, container));
    this.containers.push(container);
    this.data.push(data);
    return modalIdx;
  };
  ModalManager.prototype.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    var containerIdx = findContainer(this.data, modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];
    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1);
    if (data.modals.length === 0) {
      Object.keys(data.style).forEach(function(key) {
        return container.style[key] = data.style[key];
      });
      data.classes.forEach(_domHelpersClass2['default'].removeClass.bind(null, container));
      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    }
  };
  ModalManager.prototype.listen = function listen(handler) {
    var _this = this;
    this._listeners.push(handler);
    return function() {
      return remove(_this.listeners, handler);
    };
  };
  ModalManager.prototype._emit = function _emit(args) {
    var _this2 = this;
    this._listeners.forEach(function(l) {
      return l.apply(_this2, args);
    });
  };
  ModalManager.prototype.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };
  return ModalManager;
})();
exports['default'] = ModalManager;
module.exports = exports['default'];
