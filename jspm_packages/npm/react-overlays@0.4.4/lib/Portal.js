/* */ 
'use strict';
exports.__esModule = true;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _reactPropTypesLibMountable = require("react-prop-types/lib/mountable");
var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);
var _utilsOwnerDocument = require("./utils/ownerDocument");
var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);
var _utilsGetContainer = require("./utils/getContainer");
var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);
var Portal = _react2['default'].createClass({
  displayName: 'Portal',
  propTypes: {container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func])},
  componentDidMount: function componentDidMount() {
    this._renderOverlay();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._renderOverlay();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._unrenderOverlay();
    this._unmountOverlayTarget();
  },
  _mountOverlayTarget: function _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement('div');
      this.getContainerDOMNode().appendChild(this._overlayTarget);
    }
  },
  _unmountOverlayTarget: function _unmountOverlayTarget() {
    if (this._overlayTarget) {
      this.getContainerDOMNode().removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
  },
  _renderOverlay: function _renderOverlay() {
    var overlay = !this.props.children ? null : _react2['default'].Children.only(this.props.children);
    if (overlay !== null) {
      this._mountOverlayTarget();
      this._overlayInstance = _react2['default'].render(overlay, this._overlayTarget);
    } else {
      this._unrenderOverlay();
      this._unmountOverlayTarget();
    }
  },
  _unrenderOverlay: function _unrenderOverlay() {
    if (this._overlayTarget) {
      _react2['default'].unmountComponentAtNode(this._overlayTarget);
      this._overlayInstance = null;
    }
  },
  render: function render() {
    return null;
  },
  getOverlayDOMNode: function getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }
    if (this._overlayInstance) {
      if (this._overlayInstance.getWrappedDOMNode) {
        return this._overlayInstance.getWrappedDOMNode();
      } else {
        return _react2['default'].findDOMNode(this._overlayInstance);
      }
    }
    return null;
  },
  getContainerDOMNode: function getContainerDOMNode() {
    return _utilsGetContainer2['default'](this.props.container, _utilsOwnerDocument2['default'](this).body);
  }
});
exports['default'] = Portal;
module.exports = exports['default'];
