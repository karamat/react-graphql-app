'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Users = function (_React$Component) {
  _inherits(Users, _React$Component);

  function Users() {
    _classCallCheck(this, Users);

    var _this = _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).call(this));

    _this.state = { users: [] };
    _this._editUser = _this._editUser.bind(_this);
    return _this;
  }

  _createClass(Users, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      fetch('/graphql', {
        method: 'POST',
        body: '{ users { id, name, age {min, max}, profession, religion, region } }',
        headers: { "Content-Type": "application/graphql"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({ users: json.data.users });
      });
    }
  }, {
    key: '_editUser',
    value: function _editUser(e) {
      var id = e.target.parentElement.parentElement.id;
      this.props.router.push('/users/edit?id=' + id);
    }
  }, {
    key: '_deleteUser',
    value: function _deleteUser(e) {
      var id = e.target.parentElement.parentElement.id;
      var query = 'mutation UserMutations { \n                  deleteUser ( \n                    id: ' + id + '\n                  )\n                }';
      fetch('/graphql', {
        method: 'POST',
        body: query,
        headers: { "Content-Type": "application/graphql"
        }
      }).then(function (res) {
        // this._redirectToList();
        console.log(res);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Users'
        ),
        _react2.default.createElement(
          'ul',
          null,
          this.state.users.map(function (user) {
            return _react2.default.createElement(
              'li',
              { key: "user-" + user.id, id: user.id },
              _react2.default.createElement(
                'pre',
                null,
                JSON.stringify(user, null, 2)
              ),
              _react2.default.createElement(
                'div',
                { className: 'actions' },
                _react2.default.createElement(
                  'a',
                  { onClick: _this3._editUser },
                  'Edit'
                ),
                _react2.default.createElement(
                  'a',
                  { onClick: _this3._deleteUser },
                  'Delete'
                )
              )
            );
          })
        )
      );
    }
  }]);

  return Users;
}(_react2.default.Component);

exports.default = Users;