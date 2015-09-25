/* */ 
'use strict';
var babelHelpers = require("../util/babelHelpers");
var _utilCamelizeStyle = require("../util/camelizeStyle");
var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);
var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
module.exports = function _getComputedStyle(node) {
  if (!node)
    throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;
  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;
      prop = (0, _utilCamelizeStyle2['default'])(prop);
      if (prop == 'float')
        prop = 'styleFloat';
      var current = node.currentStyle[prop] || null;
      if (current == null && style && style[prop])
        current = style[prop];
      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left;
        if (rsLeft)
          runStyle.left = node.currentStyle.left;
        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px';
        style.left = left;
        if (rsLeft)
          runStyle.left = rsLeft;
      }
      return current;
    }};
};
