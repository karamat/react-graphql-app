'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserForm = function (_React$Component) {
  _inherits(UserForm, _React$Component);

  function UserForm(props) {
    _classCallCheck(this, UserForm);

    var _this = _possibleConstructorReturn(this, (UserForm.__proto__ || Object.getPrototypeOf(UserForm)).call(this, props));

    _this.state = { name: '', age: { min: '', max: '' }, professions: '', regions: '', religions: '' };
    _this._updateState = _this._updateState.bind(_this);
    _this._handleSubmit = _this._handleSubmit.bind(_this);
    _this._changeRegion = _this._changeRegion.bind(_this);
    _this._changeReligion = _this._changeReligion.bind(_this);
    _this._changeProfession = _this._changeProfession.bind(_this);
    return _this;
  }

  _createClass(UserForm, [{
    key: '_updateState',
    value: function _updateState(update) {
      this.setState(Object.assign({}, this.state, update));
    }
  }, {
    key: '_changeName',
    value: function _changeName(e) {
      this._updateState({ name: e.target.value });
    }
  }, {
    key: '_changeMinAge',
    value: function _changeMinAge(e) {
      this._updateState({ age: { min: e.target.value, max: this.state.age.max } });
    }
  }, {
    key: '_changeMaxAge',
    value: function _changeMaxAge(e) {
      this._updateState({ age: { min: this.state.age.min, max: e.target.value } });
    }
  }, {
    key: '_changeProfession',
    value: function _changeProfession(e) {
      this._updateState({ professions: e.target.value });
    }
  }, {
    key: '_changeRegion',
    value: function _changeRegion(e) {
      this._updateState({ regions: e.target.value });
    }
  }, {
    key: '_changeReligion',
    value: function _changeReligion(e) {
      this._updateState({ religions: e.target.value });
    }
  }, {
    key: '_handleSubmit',
    value: function _handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this._handleSubmit },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            'Name'
          ),
          _react2.default.createElement('input', { autoComplete: 'off', autoFocus: true, type: 'text', name: 'name', onChange: this._changeName.bind(this), value: this.state.name })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            'Age'
          ),
          _react2.default.createElement('input', { autoComplete: 'off', type: 'number', name: 'age[min]', onChange: this._changeMinAge.bind(this), value: this.state.age.min }),
          _react2.default.createElement('input', { autoComplete: 'off', type: 'number', name: 'age[max]', onChange: this._changeMaxAge.bind(this), value: this.state.age.max })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            'Profession'
          ),
          _react2.default.createElement(
            'select',
            { name: 'profession', onChange: this._changeProfession },
            this.props.professions.map(function (p) {
              return _react2.default.createElement(
                'option',
                { value: p.name },
                p.name
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            'Region'
          ),
          _react2.default.createElement(
            'select',
            { name: 'region', onChange: this._changeRegion },
            this.props.regions.map(function (p) {
              return _react2.default.createElement(
                'option',
                { value: p.name },
                p.name
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            'Religion'
          ),
          _react2.default.createElement(
            'select',
            { name: 'religion', onChange: this._changeReligion },
            this.props.religions.map(function (p) {
              return _react2.default.createElement(
                'option',
                { value: p.name },
                p.name
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { className: 'btn btn-default', type: 'submit' },
            'Save'
          )
        )
      );
    }
  }]);

  return UserForm;
}(_react2.default.Component);

exports.default = UserForm;