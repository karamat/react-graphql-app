"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require("react-router");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AppHandler = require("./components/AppHandler");

var _AppHandler2 = _interopRequireDefault(_AppHandler);

var _UsersHandler = require("./components/UsersHandler");

var _UsersHandler2 = _interopRequireDefault(_UsersHandler);

var _list = require("./components/users/list");

var _list2 = _interopRequireDefault(_list);

var _new = require("./components/users/new");

var _new2 = _interopRequireDefault(_new);

var _edit = require("./components/users/edit");

var _edit2 = _interopRequireDefault(_edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: "/", component: _AppHandler2.default },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: "users", component: _UsersHandler2.default },
      _react2.default.createElement(_reactRouter.Route, { path: "list", component: _list2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: "new", component: _new2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: "edit", component: _edit2.default })
    )
  )
);