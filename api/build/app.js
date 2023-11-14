"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _initialSetup = require("./libs/initialSetup");
var _user = _interopRequireDefault(require("./routes/user.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*import authRoutes from './routes/auth.routes'
import productsRoutes from './routes/products.routes'*/

var app = (0, _express["default"])();
//create_roles()

app.set('pkg', _package["default"]);
app.use((0, _morgan["default"])('dev'));
app.set("json spaces", 4);
app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});

//app.use( express.json() )
//app.use( express.urlencoded({extended:false}) )

app.use('/users', _user["default"]);
//app.use('/auth', authRoutes)
//app.use('/products', productsRoutes)
var _default = exports["default"] = app;