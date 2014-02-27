var bcms = require('../bcms')('394682e8f569211d820e424cd42f19d8');
// info about queue_name see http://developer.baidu.com/wiki/index.php?title=docs/cplat/mq/api

from = 'jimnox0491@gmail.com';
to = '1407214@qq.com';
subject = 'test';
content = 'hello';
bcms.mail(from, to, subject, content, function(err, body){
  console.log(err, body);
  if (!err && !body.error_code){
    // ...
  }
});
