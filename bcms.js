var request = require('request');
var crypto = require('crypto');

// 你可以在: [百度开发者中心](http://developer.baidu.com/bae/ref/key/) 查看和管理你的密钥对
var ak = process.env.BAE_ENV_AK;              // 用户名
var sk = process.env.BAE_ENV_SK;              // 密码

exports = module.exports = function(queue_name){
  this.queue_name = queue_name;
};
var bcmsBaseUrl = 'http://bcms.api.duapp.com';
var bcmsBasePath = '/rest/2.0/bcms/';

exports.prototype.prepareRequest = function(method, api, params, callback){
  var timestamp = params.timestamp = parseInt((new Date()).getTime() / 1000);
  params.method = api;
  params.client_id = ak;

  var url = this.buildUrl(),
      signedBody = this.signature(method, url, params);

  request({
    url: url,
    method: method,
    body: signedBody,
    headers: {
      'User-Agent' : "bcms-js",
      'Content-Length' : signedBody.length,
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  }, function(err, response, body){
    callback(err, body);
  });
};
exports.prototype.buildUrl = function(){
  return bcmsBaseUrl + bcmsBasePath + this.queue_name;
};
exports.prototype.signature = function(method, url, params){
  var keys = [];
  for (var key in params){
    keys.push(key);
  }
  keys.sort();
  var paramStr = keys.map(function(key){
    return key + '=' + params[key];
  }).join('');
  var basic_string = method.toUpperCase() + url + paramStr + sk;
  var encoded = encodeURIComponent(basic_string);
  var signed = md5(encoded);

  var body = keys.map(function(key){
    return key + '=' + encodeURIComponent(params[key]);
  }).join('&') + '&sign=' + signed;

  return body;
};
exports.prototype.mail = function(from, to, subject, content, callback){
  if (!Array.isArray(to)) to = [to];
  return this.prepareRequest('POST', 'mail', {
    message: content,
    mail_subject: subject,
    from: from,
    address: JSON.stringify(to)
  }, callback);
};

function md5(str){
  return crypto.createHash('md5').update(str).digest('hex');
}
