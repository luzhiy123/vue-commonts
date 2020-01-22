"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFormat = dateFormat;
exports.dateFormatFull = dateFormatFull;
exports.dateFormatToSecond = dateFormatToSecond;
exports.getLimtCurTime = getLimtCurTime;
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function dateFormat(date) {
  var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "YYYY-MM-DD";
  return date ? (0, _dayjs["default"])(date).format(rule) : "";
}

function dateFormatFull(date) {
  return dateFormat(date, "YYYY-MM-DD HH:mm");
}

function dateFormatToSecond(date) {
  return dateFormat(date, "YYYY-MM-DD HH:mm:ss");
}

function getLimtCurTime(time) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "time";
  var curTime = new Date();
  var targetTime;

  if (type === "time") {
    targetTime = new Date();

    var _time$split = time.split(":"),
        _time$split2 = _slicedToArray(_time$split, 3),
        h = _time$split2[0],
        m = _time$split2[1],
        s = _time$split2[2];

    targetTime.setHours(h, m, s);
  } else if (type === "date") {
    targetTime = new Date(time);
  }

  return parseInt((targetTime.getTime() - curTime.getTime()) / 1000);
}

var _default = _dayjs["default"];
exports["default"] = _default;