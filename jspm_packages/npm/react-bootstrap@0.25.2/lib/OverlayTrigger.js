/* */ 
'use strict';
var _extends = require("babel-runtime/helpers/extends")['default'];
var _Object$keys = require("babel-runtime/core-js/object/keys")['default'];
var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")['default'];
exports.__esModule = true;
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _domHelpersQueryContains = require("dom-helpers/query/contains");
var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);
var _utilsCreateChainedFunction = require("./utils/createChainedFunction");
var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
var _utilsCreateContextWrapper = require("./utils/createContextWrapper");
var _utilsCreateContextWrapper2 = _interopRequireDefault(_utilsCreateContextWrapper);
var _Overlay = require("./Overlay");
var _Overlay2 = _interopRequireDefault(_Overlay);
var _reactLibWarning = require("react/lib/warning");
var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);
var _lodashObjectPick = require("lodash/object/pick");
var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}
var OverlayTrigger = _react2['default'].createClass({
  displayName: 'OverlayTrigger',
  propTypes: _extends({}, _Overlay2['default'].propTypes, {
    trigger: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']), _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),
    delay: _react2['default'].PropTypes.number,
    delayShow: _react2['default'].PropTypes.number,
    delayHide: _react2['default'].PropTypes.number,
    defaultOverlayShown: _react2['default'].PropTypes.bool,
    overlay: _react2['default'].PropTypes.node.isRequired,
    onBlur: _react2['default'].PropTypes.func,
    onClick: _react2['default'].PropTypes.func,
    onFocus: _react2['default'].PropTypes.func,
    onMouseEnter: _react2['default'].PropTypes.func,
    onMouseLeave: _react2['default'].PropTypes.func,
    target: function target() {},
    onHide: function onHide() {},
    show: function show() {}
  }),
  getDefaultProps: function getDefaultProps() {
    return {
      defaultOverlayShown: false,
      trigger: ['hover', 'focus']
    };
  },
  getInitialState: function getInitialState() {
    return {isOverlayShown: this.props.defaultOverlayShown};
  },
  show: function show() {
    this.setState({isOverlayShown: true});
  },
  hide: function hide() {
    this.setState({isOverlayShown: false});
  },
  toggle: function toggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  },
  componentWillMount: function componentWillMount() {
    this.handleMouseOver = this.handleMouseOverOut.bind(null, this.handleDelayedShow);
    this.handleMouseOut = this.handleMouseOverOut.bind(null, this.handleDelayedHide);
  },
  componentDidMount: function componentDidMount() {
    this._mountNode = document.createElement('div');
    _react2['default'].render(this._overlay, this._mountNode);
  },
  componentWillUnmount: function componentWillUnmount() {
    _react2['default'].unmountComponentAtNode(this._mountNode);
    this._mountNode = null;
    clearTimeout(this._hoverDelay);
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this._mountNode) {
      _react2['default'].render(this._overlay, this._mountNode);
    }
  },
  getOverlayTarget: function getOverlayTarget() {
    return _react2['default'].findDOMNode(this);
  },
  getOverlay: function getOverlay() {
    var overlayProps = _extends({}, _lodashObjectPick2['default'](this.props, _Object$keys(_Overlay2['default'].propTypes)), {
      show: this.state.isOverlayShown,
      onHide: this.hide,
      target: this.getOverlayTarget,
      onExit: this.props.onExit,
      onExiting: this.props.onExiting,
      onExited: this.props.onExited,
      onEnter: this.props.onEnter,
      onEntering: this.props.onEntering,
      onEntered: this.props.onEntered
    });
    var overlay = _react.cloneElement(this.props.overlay, {
      placement: overlayProps.placement,
      container: overlayProps.container
    });
    return _react2['default'].createElement(_Overlay2['default'], overlayProps, overlay);
  },
  render: function render() {
    var trigger = _react2['default'].Children.only(this.props.children);
    var triggerProps = trigger.props;
    var props = {'aria-describedby': this.props.overlay.props.id};
    this._overlay = this.getOverlay();
    props.onClick = _utilsCreateChainedFunction2['default'](triggerProps.onClick, this.props.onClick);
    if (isOneOf('click', this.props.trigger)) {
      props.onClick = _utilsCreateChainedFunction2['default'](this.toggle, props.onClick);
    }
    if (isOneOf('hover', this.props.trigger)) {
      _reactLibWarning2['default'](!(this.props.trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' + 'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.');
      props.onMouseOver = _utilsCreateChainedFunction2['default'](this.handleMouseOver, this.props.onMouseOver, triggerProps.onMouseOver);
      props.onMouseOut = _utilsCreateChainedFunction2['default'](this.handleMouseOut, this.props.onMouseOut, triggerProps.onMouseOut);
    }
    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = _utilsCreateChainedFunction2['default'](this.handleDelayedShow, this.props.onFocus, triggerProps.onFocus);
      props.onBlur = _utilsCreateChainedFunction2['default'](this.handleDelayedHide, this.props.onBlur, triggerProps.onBlur);
    }
    return _react.cloneElement(trigger, props);
  },
  handleDelayedShow: function handleDelayedShow() {
    var _this = this;
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }
    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;
    if (!delay) {
      this.show();
      return;
    }
    this._hoverDelay = setTimeout(function() {
      _this._hoverDelay = null;
      _this.show();
    }, delay);
  },
  handleDelayedHide: function handleDelayedHide() {
    var _this2 = this;
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }
    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;
    if (!delay) {
      this.hide();
      return;
    }
    this._hoverDelay = setTimeout(function() {
      _this2._hoverDelay = null;
      _this2.hide();
    }, delay);
  },
  handleMouseOverOut: function handleMouseOverOut(handler, e) {
    var target = e.currentTarget;
    var related = e.relatedTarget || e.nativeEvent.toElement;
    if (!related || related !== target && !_domHelpersQueryContains2['default'](target, related)) {
      handler(e);
    }
  }
});
OverlayTrigger.withContext = _utilsCreateContextWrapper2['default'](OverlayTrigger, 'overlay');
exports['default'] = OverlayTrigger;
module.exports = exports['default'];
