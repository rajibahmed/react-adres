/* */ 
'use strict';
var _extends = require("babel-runtime/helpers/extends")['default'];
var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")['default'];
exports.__esModule = true;
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _classnames = require("classnames");
var _classnames2 = _interopRequireDefault(_classnames);
var _BootstrapMixin = require("./BootstrapMixin");
var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
var ButtonToolbar = _react2['default'].createClass({
  displayName: 'ButtonToolbar',
  mixins: [_BootstrapMixin2['default']],
  getDefaultProps: function getDefaultProps() {
    return {bsClass: 'button-toolbar'};
  },
  render: function render() {
    var classes = this.getBsClassSet();
    return _react2['default'].createElement('div', _extends({}, this.props, {
      role: 'toolbar',
      className: _classnames2['default'](this.props.className, classes)
    }), this.props.children);
  }
});
exports['default'] = ButtonToolbar;
module.exports = exports['default'];
