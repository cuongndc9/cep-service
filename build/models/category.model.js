"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Category = /*#__PURE__*/function (_Model) {
  _inherits(Category, _Model);

  var _super = _createSuper(Category);

  function Category() {
    _classCallCheck(this, Category);

    return _super.apply(this, arguments);
  }

  _createClass(Category, null, [{
    key: "init",
    value: function init(sequelize) {
      _get(_getPrototypeOf(Category), "init", this).call(this, {
        id: {
          type: _sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: _sequelize.DataTypes.UUIDV4
        },
        code: {
          type: _sequelize.DataTypes.STRING
        },
        parentId: {
          type: _sequelize.DataTypes.UUID,
          references: {
            model: 'categories',
            key: 'id'
          }
        },
        count: {
          type: _sequelize.DataTypes.NUMBER
        },
        orderBy: {
          type: _sequelize.DataTypes.NUMBER
        },
        keyword: {
          type: _sequelize.DataTypes.TEXT
        },
        createdBy: {
          type: _sequelize.DataTypes.UUID,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        updatedBy: {
          type: _sequelize.DataTypes.UUID,
          references: {
            model: 'users',
            key: 'id'
          }
        }
      }, {
        sequelize: sequelize,
        modelName: 'categories'
      });
    }
  }, {
    key: "associate",
    value: function associate(models) {
      this.hasMany(models.Post, {
        foreignKey: 'categoryId'
      });
      this.hasMany(models.Faq, {
        foreignKey: 'categoryId'
      });
      this.hasOne(models.Category, {
        foreignKey: 'parentId'
      });
      this.belongsTo(models.User), {
        as: 'createdBy',
        foreignKey: 'createdBy'
      };
      this.belongsTo(models.User), {
        as: 'updatedBy',
        foreignKey: 'updatedBy'
      };
    }
  }]);

  return Category;
}(_sequelize.Model);

var _default = Category;
exports["default"] = _default;