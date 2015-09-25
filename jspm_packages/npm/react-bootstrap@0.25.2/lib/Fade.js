/* */ 
'use strict';
var _inherits = require("babel-runtime/helpers/inherits")['default'];
var _classCallCheck = require("babel-runtime/helpers/class-call-check")['default'];
var _extends = require("babel-runtime/helpers/extends")['default'];
var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")['default'];
exports.__esModule = true;
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _reactOverlaysLibTransition = require("react-overlays/lib/Transition");
var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);
var _utilsCustomPropTypes = require("./utils/CustomPropTypes");
var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
var _utilsDeprecationWarning = require("./utils/deprecationWarning");
var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
var Fade = (function(_React$Component) {
  _inherits(Fade, _React$Component);
  function Fade() {
    _classCallCheck(this, Fade);
    _React$Component.apply(this, arguments);
  }
  Fade.prototype.render = function render() {
    var timeout = this.props.timeout || this.props.duration;
    return _react2['default'].createElement(_reactOverlaysLibTransition2['default'], _extends({}, this.props, {
      timeout: timeout,
      className: 'fade',
      enteredClassName: 'in',
      enteringClassName: 'in'
    }), this.props.children);
  };
  return Fade;
})(_react2['default'].Component);
Fade.propTypes = {
  'in': _react2['default'].PropTypes.bool,
  unmountOnExit: _react2['default'].PropTypes.bool,
  transitionAppear: _react2['default'].PropTypes.bool,
  timeout: _react2['default'].PropTypes.number,
  duration: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.number, function(props) {
    if (props.duration != null) {
      _utilsDeprecationWarning2['default']('Fade `duration`', 'the `timeout` prop');
    }
    return null;
  }]),
  onEnter: _react2['default'].PropTypes.func,
  onEntering: _react2['default'].PropTypes.func,
  onEntered: _react2['default'].PropTypes.func,
  onExit: _react2['default'].PropTypes.func,
  onExiting: _react2['default'].PropTypes.func,
  onExited: _react2['default'].PropTypes.func
};
Fade.defaultProps = {
  'in': false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false
};
exports['default'] = Fade;
module.exports = exports['default'];
