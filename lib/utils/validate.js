"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExternal = isExternal;
exports.validateURL = validateURL;
exports.validateEmail = validateEmail;
exports.validatePhone = validatePhone;
exports.validateTel = validateTel;
exports.validatePassword = validatePassword;
exports.validateIdcard = validateIdcard;
exports.validateBusinessLicense = validateBusinessLicense;
exports.validateLetter = validateLetter;
exports.validateParseInt = validateParseInt;
exports.validateParseNumLetter = validateParseNumLetter;
exports.validateQq = validateQq;
exports.validateNumFloat = validateNumFloat;
exports.validateCompanyName = validateCompanyName;
exports.validateMoney = validateMoney;
exports.validateObj = exports.validateCompanyNameTips = exports.validateNumFloatTips = exports.validateQqTips = exports.validateParseNumLetterTips = exports.validateParseIntTips = exports.validateLetterTips = exports.validateBusinessLicenseTips = exports.validateIdcardTips = exports.validatePasswordTips = exports.validateTelTips = exports.validatePhoneTips = exports.validateEmailTips = exports.validateURLTips = void 0;

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/* 网址 */


function validateURL(str) {
  var urlregex = /^((https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(str);
}

var validateURLTips = "网址格式不对";
/* 邮箱 */

exports.validateURLTips = validateURLTips;

function validateEmail(str) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(str);
}

var validateEmailTips = "邮箱格式不对";
/* 手机 */

exports.validateEmailTips = validateEmailTips;

function validatePhone(str) {
  var re = /(^0[1-9]\d{1,2}-?\d{7,8}$)|(^1[3-9]\d{9}$)/;
  return re.test(str);
}

var validatePhoneTips = "电话号码格式不对";
/* tel 固话和手机 */

exports.validatePhoneTips = validatePhoneTips;

function validateTel(str) {
  var re = /^1[3-9]\d{9}$/;
  return re.test(str);
}

var validateTelTips = "手机号格式不对";
/* 注册密码 */

exports.validateTelTips = validateTelTips;

function validatePassword(str) {
  var re = /^[\w!@#$%^&*()\-_=+\\|[\]{};:/?.><]{8,16}$/;
  return re.test(str);
}

var validatePasswordTips = "密码格式8~16位数";
/* 身份证 */

exports.validatePasswordTips = validatePasswordTips;

function validateIdcard(str) {
  var re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  return re.test(str);
}

var validateIdcardTips = "身份证号码格式不对";
/* 工商营业执照 */

exports.validateIdcardTips = validateIdcardTips;

function validateBusinessLicense(str) {
  var re = /^[0-9a-zA-Z]{18}$/;
  return re.test(str);
}

var validateBusinessLicenseTips = "营业执照号格式不对";
/* 只允许是字母 */

exports.validateBusinessLicenseTips = validateBusinessLicenseTips;

function validateLetter(str) {
  var re = /^[A-Za-z]+$/;
  return re.test(str);
}

var validateLetterTips = "只能是字母";
/* 整数 */

exports.validateLetterTips = validateLetterTips;

function validateParseInt(str) {
  var re = /^[0-9]*[1-9][0-9]*$/;
  return re.test(str);
}

var validateParseIntTips = "只能是正整数";
/* 数字和字母 */

exports.validateParseIntTips = validateParseIntTips;

function validateParseNumLetter(str) {
  var re = /^[0-9a-zA-Z]+$/;
  return re.test(str);
}

var validateParseNumLetterTips = "只能是字母、数字";
/* QQ号码 */

exports.validateParseNumLetterTips = validateParseNumLetterTips;

function validateQq(str) {
  var re = /^[1-9]\d{4,10}$/;
  return re.test(str);
}

var validateQqTips = "QQ号码不正确";
/* 数字且只有2位小数 */

exports.validateQqTips = validateQqTips;

function validateNumFloat(str) {
  var re = /^[0-9]+(.[0-9]{2})?$/;
  return re.test(str);
}

var validateNumFloatTips = "只能是数字且最多两位小数";
/* 公司名称 */

exports.validateNumFloatTips = validateNumFloatTips;

function validateCompanyName(str) {
  var re = /^[\u4e00-\u9fa5]+([(（][\u4e00-\u9fa5]+[)）])*[\u4e00-\u9fa5]*$/;
  return re.test(str);
}

var validateCompanyNameTips = "企业名称格式错误";
exports.validateCompanyNameTips = validateCompanyNameTips;

function validateMoney(str) {
  var re = /^\d+\.?\d{0,2}$/;
  return re.test(str);
}
/* 不必须表单，单独的正则验证 */


var validateObj = {
  checkParseInt: /^[0-9]*[1-9][0-9]*$/,
  checkParseIntTps: "只能输入整数",
  checkNumLeeter: /^[0-9a-zA-Z]*$/,
  checkNumLeeterTips: "只能输入数字、字母",
  checkNumFloat: /^[0-9]+(.[0-9]{2})?$/,
  checkNumFloatTips: "只能是数字且最多两位小数",
  checkTelPhone: /^1[3-9]\d{9}$/,
  checkQq: /^[1-9]\d{4,10}$/,
  checkHttp: /^((https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
  checkEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
exports.validateObj = validateObj;