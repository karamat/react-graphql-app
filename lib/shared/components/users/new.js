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
      professions: [{ name: 'Select profession', value: 0 }],
      religions: [{ name: 'Select religion', value: 0 }],
      regions: [{ name: 'Select region', value: 0 }],
      user: { name: '', age: { min: '', max: '' }, profession: '', region: '', religion: '' }

    };
    _this._updateState = _this._updateState.bind(_this);
    _this._submitForm = _this._submitForm.bind(_this);
    _this._redirectToList = _this._redirectToList.bind(_this);

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
        var professions = _this2.state.professions.concat(json.data.professions);
        var religions = _this2.state.religions.concat(json.data.religions);
        var regions = _this2.state.regions.concat(json.data.regions);

        _this2.setState({ professions: professions, religions: religions, regions: regions });
      });
    }
  }, {
    key: '_submitForm',
    value: function _submitForm() {
      var _this3 = this;

      var user = this.state.user;
      var query = 'mutation UserMutations { \n                  createUser ( \n                    user: { \n                      name: "' + user.name + '",\n                      age: { \n                        min: ' + user.age.min + ',\n                        max: ' + user.age.max + '\n                      },\n                      profession: ' + user.profession + ',\n                      religion: ' + user.religion + ',\n                      region: ' + user.region + '\n                    }\n                  ) { id, name, age { min, max }, profession, religion, region }\n                }';

      fetch('/graphql', {
        method: 'POST',
        body: query,
        headers: { "Content-Type": "application/graphql"
        }
      }).then(function (res) {
        _this3._redirectToList();
      });
    }
  }, {
    key: '_redirectToList',
    value: function _redirectToList() {
      this.props.router.push('/users');
    }
  }, {
    key: '_updateState',
    value: function _updateState(update) {
      var user = Object.assign({}, this.state.user, update);
      this.setState(Object.assign({}, this.state, { user: user }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_form2.default, { professions: this.state.professions, regions: this.state.regions,
          religions: this.state.religions, onSubmit: this._submitForm, updateState: this._updateState, user: this.state.user })
      );
    }
  }]);

  return UsersNew;
}(_react2.default.Component);

exports.default = UsersNew;