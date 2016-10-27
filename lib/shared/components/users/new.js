'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('util');

var UsersNew = function (_React$Component) {
  _inherits(UsersNew, _React$Component);

  function UsersNew() {
    _classCallCheck(this, UsersNew);

    var _this = _possibleConstructorReturn(this, (UsersNew.__proto__ || Object.getPrototypeOf(UsersNew)).call(this));

    _this.state = {
      professions: [],
      religions: [],
      regions: []
    };
    _this._submitForm = _this._submitForm.bind(_this);
    return _this;
  }

  _createClass(UsersNew, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      fetch('/graphql', {
        method: 'POST',
        body: '{ professions { name, value } regions { name, value } religions { name, value } }',
        headers: { "Content-Type": "application/graphql" }
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          professions: json.data.professions,
          religions: json.data.religions,
          regions: json.data.regions
        });
      });
    }
  }, {
    key: '_submitForm',
    value: function _submitForm(data) {
      var query = 'mutation UserMutations{ createUser { user: { name: "' + data.name + '", age: { min: ' + data.age.min + ', max: ' + data.age.max + ' } } } }';
      query = query.replace('\n', '');
      console.log(query);
      fetch('/graphql', {
        method: 'POST',
        body: query,
        headers: { "Content-Type": "application/graphql"
        }
      }).then(function (res) {
        return res.json();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_form2.default, { professions: this.state.professions, regions: this.state.regions,
          religions: this.state.religions, onSubmit: this._submitForm })
      );
    }
  }]);

  return UsersNew;
}(_react2.default.Component);

exports.default = UsersNew;