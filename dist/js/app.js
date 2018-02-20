webpackJsonp([1],{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(111);


/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(126);

var _reactRouterDom = __webpack_require__(97);

var _Home = __webpack_require__(239);

var _Home2 = _interopRequireDefault(_Home);

var _Words = __webpack_require__(242);

var _Words2 = _interopRequireDefault(_Words);

var _Projects = __webpack_require__(264);

var _Projects2 = _interopRequireDefault(_Projects);

var _NotFound = __webpack_require__(265);

var _NotFound2 = _interopRequireDefault(_NotFound);

__webpack_require__(266);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
  _reactRouterDom.BrowserRouter,
  { history: _reactRouterDom.browserHistory },
  _react2.default.createElement(
    'div',
    { id: 'content-wrapper' },
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', restrict: true, component: _Home2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/words', component: _Words2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/projects', component: _Projects2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { component: _NotFound2.default })
    )
  )
), document.querySelector('#main'));

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(97);

__webpack_require__(240);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    'div',
    { id: 'home' },
    _react2.default.createElement(
      'h1',
      null,
      'Welcome!'
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/words' },
      'Words'
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/projects' },
      'Projects'
    )
  );
};

// returnib Home functsioni
exports.default = Home;

/***/ }),

/***/ 240:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _Form = __webpack_require__(243);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Words = function Words() {
    return _react2.default.createElement(
        'div',
        { id: 'words' },
        _react2.default.createElement(
            'h1',
            null,
            'Words'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_Form2.default, null)
    );
};

exports.default = Words;

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(244);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.state = {};
        _this.saveWord = _this.saveWord.bind(_this);
        return _this;
    }

    _createClass(Form, [{
        key: 'saveWord',
        value: function saveWord(event) {
            var _this2 = this;

            event.preventDefault();
            var name = document.querySelector('input#name').value;

            (0, _api2.default)('POST', '/words', {
                data: { name: name }
            }).then(function (results) {
                console.log(results);
                var word = results.word;

                _this2.setState({
                    msg: 'Word saved successfully ' + word.name
                });
            }).catch(function (error) {
                console.log(error);
                _this2.setState({
                    error: error.data.errors.name.msg
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.saveWord },
                _react2.default.createElement('input', { id: 'name', type: 'text' }),
                _react2.default.createElement('input', { type: 'submit', value: 'save' })
            );
        }
    }]);

    return Form;
}(_react2.default.Component);

exports.default = Form;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = __webpack_require__(245);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = '/api';

exports.default = function (method, url, query) {
    return _axios2.default.request({
        method: method,
        baseURL: BASE_URL,
        url: url,
        data: query.data || {},
        params: query.params || {}
    }).then(function (response) {
        return Promise.resolve(response.data);
    }).catch(function (err) {
        console.error(err);
        return Promise.reject(err.response);
    });
};

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Projects = function Projects() {
    return _react2.default.createElement(
        'div',
        { id: 'projects' },
        _react2.default.createElement(
            'h1',
            null,
            'Projects'
        )
    );
};

exports.default = Projects;

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// siin kohe export sisse pandud mida ta peaks returnima esilehele
exports.default = function () {
  return _react2.default.createElement(
    'h2',
    null,
    'Not Found!'
  );
};

/***/ }),

/***/ 266:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[110]);
//# sourceMappingURL=app.js.map