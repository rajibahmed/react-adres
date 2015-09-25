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
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }});
  if (superClass)
    subClass.__proto__ = superClass;
}
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _utilsAddEventListener = require("./utils/addEventListener");
var _utilsAddEventListener2 = _interopRequireDefault(_utilsAddEventListener);
var _utilsCreateChainedFunction = require("./utils/createChainedFunction");
var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
var _utilsOwnerDocument = require("./utils/ownerDocument");
var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);
var CLICK_WAS_INSIDE = '__click_was_inside';
function suppressRootClose(event) {
  event.nativeEvent[CLICK_WAS_INSIDE] = true;
}
var RootCloseWrapper = (function(_React$Component) {
  function RootCloseWrapper(props) {
    _classCallCheck(this, RootCloseWrapper);
    _React$Component.call(this, props);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
  }
  _inherits(RootCloseWrapper, _React$Component);
  RootCloseWrapper.prototype.bindRootCloseHandlers = function bindRootCloseHandlers() {
    var doc = _utilsOwnerDocument2['default'](this);
    this._onDocumentClickListener = _utilsAddEventListener2['default'](doc, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener = _utilsAddEventListener2['default'](doc, 'keyup', this.handleDocumentKeyUp);
  };
  RootCloseWrapper.prototype.handleDocumentClick = function handleDocumentClick(e) {
    if (e[CLICK_WAS_INSIDE]) {
      return;
    }
    this.props.onRootClose();
  };
  RootCloseWrapper.prototype.handleDocumentKeyUp = function handleDocumentKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.onRootClose();
    }
  };
  RootCloseWrapper.prototype.unbindRootCloseHandlers = function unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }
    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  };
  RootCloseWrapper.prototype.componentDidMount = function componentDidMount() {
    this.bindRootCloseHandlers();
  };
  RootCloseWrapper.prototype.render = function render() {
    var _props = this.props;
    var noWrap = _props.noWrap;
    var children = _props.children;
    var child = _react2['default'].Children.only(children);
    if (noWrap) {
      return _react2['default'].cloneElement(child, {onClick: _utilsCreateChainedFunction2['default'](suppressRootClose, child.props.onClick)});
    }
    return _react2['default'].createElement('div', {onClick: suppressRootClose}, child);
  };
  RootCloseWrapper.prototype.getWrappedDOMNode = function getWrappedDOMNode() {
    var node = _react2['default'].findDOMNode(this);
    return this.props.noWrap ? node : node.firstChild;
  };
  RootCloseWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unbindRootCloseHandlers();
  };
  return RootCloseWrapper;
})(_react2['default'].Component);
exports['default'] = RootCloseWrapper;
RootCloseWrapper.displayName = 'RootCloseWrapper';
RootCloseWrapper.propTypes = {
  onRootClose: _react2['default'].PropTypes.func.isRequired,
  noWrap: _react2['default'].PropTypes.bool
};
module.exports = exports['default'];
